import express from 'express';
import { body, query, param, validationResult } from 'express-validator';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import { getPrismaClient, searchWithPagination } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/errors.js';
import { uploadMiddleware } from '../middleware/upload.js';

const router = express.Router();
const prisma = getPrismaClient();

// Validation rules
const createProductValidation = [
  body('name').trim().isLength({ min: 2, max: 200 }).withMessage('Name must be between 2 and 200 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('categoryId').isUUID().withMessage('Valid category ID is required'),
  body('sku').trim().isLength({ min: 3, max: 50 }).withMessage('SKU must be between 3 and 50 characters'),
  body('quantity').optional().isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer')
];

// Get all products with filters and pagination
router.get('/', optionalAuth, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      brand,
      minPrice,
      maxPrice,
      rating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      featured,
      status = 'ACTIVE'
    } = req.query;

    // Build where clause
    const where = {
      status,
      isActive: true,
      ...(category && { categoryId: category }),
      ...(brand && { brandId: brand }),
      ...(featured && { isFeatured: featured === 'true' }),
      ...(minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: parseFloat(minPrice) }),
          ...(maxPrice && { lte: parseFloat(maxPrice) })
        }
      },
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { shortDescription: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    // Build order by
    const orderBy = {};
    if (sortBy === 'price') {
      orderBy.price = sortOrder;
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder;
    } else if (sortBy === 'rating') {
      orderBy.reviews = { _count: sortOrder };
    } else {
      orderBy[sortBy] = sortOrder;
    }

    const result = await searchWithPagination('product', {
      where,
      orderBy,
      page: parseInt(page),
      limit: parseInt(limit),
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        },
        brand: {
          select: { id: true, name: true, slug: true }
        },
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 5
        },
        reviews: {
          select: { rating: true },
          where: { isApproved: true }
        },
        _count: {
          select: { reviews: true }
        }
      }
    });

    // Calculate average rating for each product
    const productsWithRating = result.items.map(product => {
      const ratings = product.reviews.map(r => r.rating);
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;
      
      return {
        ...product,
        rating: Math.round(avgRating * 10) / 10,
        reviewCount: product._count.reviews,
        reviews: undefined,
        _count: undefined
      };
    });

    res.json({
      success: true,
      data: {
        products: productsWithRating,
        pagination: result.pagination
      }
    });

  } catch (error) {
    logger.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// Get featured products
router.get('/featured', optionalAuth, async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await prisma.product.findMany({
      where: {
        isFeatured: true,
        status: 'ACTIVE',
        isActive: true
      },
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
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
    });

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

    res.json({
      success: true,
      data: { products: productsWithRating }
    });

  } catch (error) {
    logger.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured products'
    });
  }
});

// Get new products
router.get('/new', optionalAuth, async (req, res) => {
  try {
    const { limit = 12 } = req.query;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const products = await prisma.product.findMany({
      where: {
        status: 'ACTIVE',
        isActive: true,
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      take: parseInt(limit),
      orderBy: { createdAt: 'desc' },
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
    });

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

    res.json({
      success: true,
      data: { products: productsWithRating }
    });

  } catch (error) {
    logger.error('Get new products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch new products'
    });
  }
});

// Get single product by ID or slug
router.get('/:identifier', optionalAuth, async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Check if identifier is UUID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);
    
    const product = await prisma.product.findUnique({
      where: isUUID ? { id: identifier } : { slug: identifier },
      include: {
        category: {
          select: { id: true, name: true, slug: true }
        },
        brand: {
          select: { id: true, name: true, slug: true, logo: true }
        },
        images: {
          orderBy: { sortOrder: 'asc' }
        },
        variants: true,
        attributes: true,
        reviews: {
          where: { isApproved: true },
          include: {
            user: {
              select: { firstName: true, lastName: true, avatar: true }
            }
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.status !== 'ACTIVE' || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Product not available'
      });
    }

    // Calculate rating statistics
    const ratings = product.reviews.map(r => r.rating);
    const avgRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
      : 0;

    const ratingDistribution = {
      5: ratings.filter(r => r === 5).length,
      4: ratings.filter(r => r === 4).length,
      3: ratings.filter(r => r === 3).length,
      2: ratings.filter(r => r === 2).length,
      1: ratings.filter(r => r === 1).length
    };

    // Get related products
    const relatedProducts = await prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
        status: 'ACTIVE',
        isActive: true
      },
      take: 4,
      include: {
        images: {
          orderBy: { sortOrder: 'asc' },
          take: 1
        }
      }
    });

    res.json({
      success: true,
      data: {
        product: {
          ...product,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: ratings.length,
          ratingDistribution
        },
        relatedProducts
      }
    });

  } catch (error) {
    logger.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
});

// Create new product (Admin only)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), createProductValidation, async (req, res) => {
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
      name,
      description,
      shortDescription,
      sku,
      price,
      comparePrice,
      costPrice,
      quantity,
      minQuantity,
      weight,
      dimensions,
      categoryId,
      brandId,
      isFeatured,
      metaTitle,
      metaDescription,
      images,
      variants,
      attributes
    } = req.body;

    // Generate slug from name
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if SKU already exists
    const existingSku = await prisma.product.findUnique({
      where: { sku }
    });

    if (existingSku) {
      return res.status(409).json({
        success: false,
        message: 'Product with this SKU already exists'
      });
    }

    // Create product with related data
    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        sku,
        price,
        comparePrice,
        costPrice,
        quantity: quantity || 0,
        minQuantity: minQuantity || 0,
        weight,
        dimensions,
        categoryId,
        brandId,
        isFeatured: isFeatured || false,
        metaTitle,
        metaDescription,
        status: 'ACTIVE',
        images: images ? {
          create: images.map((img, index) => ({
            url: img.url,
            alt: img.alt || name,
            sortOrder: index
          }))
        } : undefined,
        variants: variants ? {
          create: variants.map(variant => ({
            name: variant.name,
            value: variant.value,
            price: variant.price,
            quantity: variant.quantity || 0,
            sku: variant.sku
          }))
        } : undefined,
        attributes: attributes ? {
          create: attributes.map(attr => ({
            name: attr.name,
            value: attr.value
          }))
        } : undefined
      },
      include: {
        category: true,
        brand: true,
        images: true,
        variants: true,
        attributes: true
      }
    });

    logger.info(`Product created: ${product.name} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: { product }
    });

  } catch (error) {
    logger.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
});

export default router;
