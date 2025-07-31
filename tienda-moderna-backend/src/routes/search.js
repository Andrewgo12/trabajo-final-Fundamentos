import express from 'express';
import { query, validationResult } from 'express-validator';
import { optionalAuth } from '../middleware/auth.js';
import { getPrismaClient } from '../config/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const prisma = getPrismaClient();

// Search validation
const searchValidation = [
  query('q').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Search query must be between 1 and 100 characters'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 50 }).withMessage('Limit must be between 1 and 50')
];

// Global search (products, categories, brands)
router.get('/', optionalAuth, searchValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      q: searchQuery,
      page = 1,
      limit = 12,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      sortBy = 'relevance',
      sortOrder = 'desc',
      inStock = true
    } = req.query;

    if (!searchQuery) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    // Build search conditions
    const searchConditions = {
      OR: [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
        { shortDescription: { contains: searchQuery, mode: 'insensitive' } },
        { sku: { contains: searchQuery, mode: 'insensitive' } }
      ]
    };

    // Build filters
    const where = {
      AND: [
        searchConditions,
        { status: 'ACTIVE' },
        { isActive: true },
        ...(category && [{ categoryId: category }]),
        ...(brand && [{ brandId: brand }]),
        ...(inStock === 'true' && [{ quantity: { gt: 0 } }]),
        ...(minPrice || maxPrice) && [{
          price: {
            ...(minPrice && { gte: parseFloat(minPrice) }),
            ...(maxPrice && { lte: parseFloat(maxPrice) })
          }
        }]
      ]
    };

    // Build order by
    let orderBy = {};
    if (sortBy === 'price') {
      orderBy = { price: sortOrder };
    } else if (sortBy === 'name') {
      orderBy = { name: sortOrder };
    } else if (sortBy === 'rating') {
      // For rating, we'll sort by review count for now
      orderBy = { reviews: { _count: sortOrder } };
    } else if (sortBy === 'newest') {
      orderBy = { createdAt: 'desc' };
    } else {
      // Default relevance sorting (by creation date for now)
      orderBy = { createdAt: 'desc' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute search
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy,
        include: {
          category: {
            select: { id: true, name: true, slug: true }
          },
          brand: {
            select: { id: true, name: true, slug: true }
          },
          images: {
            orderBy: { sortOrder: 'asc' },
            take: 1
          },
          reviews: {
            select: { rating: true },
            where: { isApproved: true }
          }
        }
      }),
      prisma.product.count({ where })
    ]);

    // Calculate ratings
    const productsWithRating = products.map(product => {
      const ratings = product.reviews.map(r => r.rating);
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;
      
      return {
        ...product,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: ratings.length,
        reviews: undefined
      };
    });

    // Get search suggestions (categories and brands that match)
    const [matchingCategories, matchingBrands] = await Promise.all([
      prisma.category.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } }
          ],
          isActive: true
        },
        select: { id: true, name: true, slug: true },
        take: 5
      }),
      prisma.brand.findMany({
        where: {
          OR: [
            { name: { contains: searchQuery, mode: 'insensitive' } },
            { description: { contains: searchQuery, mode: 'insensitive' } }
          ],
          isActive: true
        },
        select: { id: true, name: true, slug: true },
        take: 5
      })
    ]);

    // Get available filters for current search
    const availableFilters = await getAvailableFilters(where);

    res.json({
      success: true,
      data: {
        query: searchQuery,
        products: productsWithRating,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
          hasNext: parseInt(page) * parseInt(limit) < total,
          hasPrev: parseInt(page) > 1
        },
        suggestions: {
          categories: matchingCategories,
          brands: matchingBrands
        },
        filters: availableFilters
      }
    });

  } catch (error) {
    logger.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed'
    });
  }
});

// Search suggestions (autocomplete)
router.get('/suggestions', optionalAuth, async (req, res) => {
  try {
    const { q: searchQuery, limit = 10 } = req.query;

    if (!searchQuery || searchQuery.length < 2) {
      return res.json({
        success: true,
        data: { suggestions: [] }
      });
    }

    // Get product suggestions
    const productSuggestions = await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchQuery, mode: 'insensitive' } },
          { description: { contains: searchQuery, mode: 'insensitive' } }
        ],
        status: 'ACTIVE',
        isActive: true
      },
      select: {
        id: true,
        name: true,
        slug: true,
        price: true,
        images: {
          take: 1,
          orderBy: { sortOrder: 'asc' }
        }
      },
      take: parseInt(limit),
      orderBy: { name: 'asc' }
    });

    // Get category suggestions
    const categorySuggestions = await prisma.category.findMany({
      where: {
        name: { contains: searchQuery, mode: 'insensitive' },
        isActive: true
      },
      select: {
        id: true,
        name: true,
        slug: true
      },
      take: 3,
      orderBy: { name: 'asc' }
    });

    // Get brand suggestions
    const brandSuggestions = await prisma.brand.findMany({
      where: {
        name: { contains: searchQuery, mode: 'insensitive' },
        isActive: true
      },
      select: {
        id: true,
        name: true,
        slug: true
      },
      take: 3,
      orderBy: { name: 'asc' }
    });

    const suggestions = [
      ...productSuggestions.map(p => ({ ...p, type: 'product' })),
      ...categorySuggestions.map(c => ({ ...c, type: 'category' })),
      ...brandSuggestions.map(b => ({ ...b, type: 'brand' }))
    ];

    res.json({
      success: true,
      data: { suggestions }
    });

  } catch (error) {
    logger.error('Search suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get search suggestions'
    });
  }
});

// Popular searches
router.get('/popular', optionalAuth, async (req, res) => {
  try {
    // For now, return static popular searches
    // In a real app, you'd track search queries and return the most popular ones
    const popularSearches = [
      'desinfectante',
      'limpiador multiusos',
      'detergente',
      'jabón antibacterial',
      'limpiador de pisos',
      'toallas húmedas',
      'alcohol gel',
      'limpiador de vidrios'
    ];

    res.json({
      success: true,
      data: { searches: popularSearches }
    });

  } catch (error) {
    logger.error('Popular searches error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get popular searches'
    });
  }
});

// Search filters
router.get('/filters', optionalAuth, async (req, res) => {
  try {
    const { q: searchQuery, category, brand } = req.query;

    let baseWhere = {
      status: 'ACTIVE',
      isActive: true
    };

    if (searchQuery) {
      baseWhere.OR = [
        { name: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } }
      ];
    }

    if (category) {
      baseWhere.categoryId = category;
    }

    if (brand) {
      baseWhere.brandId = brand;
    }

    const filters = await getAvailableFilters(baseWhere);

    res.json({
      success: true,
      data: { filters }
    });

  } catch (error) {
    logger.error('Search filters error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get search filters'
    });
  }
});

// Helper function to get available filters
async function getAvailableFilters(baseWhere) {
  const [categories, brands, priceRange] = await Promise.all([
    // Available categories
    prisma.category.findMany({
      where: {
        products: {
          some: baseWhere
        },
        isActive: true
      },
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' }
    }),
    // Available brands
    prisma.brand.findMany({
      where: {
        products: {
          some: baseWhere
        },
        isActive: true
      },
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' }
    }),
    // Price range
    prisma.product.aggregate({
      where: baseWhere,
      _min: { price: true },
      _max: { price: true }
    })
  ]);

  return {
    categories,
    brands,
    priceRange: {
      min: priceRange._min.price || 0,
      max: priceRange._max.price || 0
    }
  };
}

export default router;
