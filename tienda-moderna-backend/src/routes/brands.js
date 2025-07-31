import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import { getPrismaClient } from '../config/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const prisma = getPrismaClient();

// Get all brands
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { 
      includeProducts = false, 
      includeInactive = false,
      page = 1,
      limit = 50
    } = req.query;

    const where = {
      ...(includeInactive !== 'true' && { isActive: true })
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [brands, total] = await Promise.all([
      prisma.brand.findMany({
        where,
        orderBy: { name: 'asc' },
        skip,
        take: parseInt(limit),
        include: {
          ...(includeProducts === 'true' && {
            products: {
              where: { status: 'ACTIVE', isActive: true },
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
              take: 8,
              orderBy: { createdAt: 'desc' }
            }
          }),
          _count: {
            select: { 
              products: {
                where: { status: 'ACTIVE', isActive: true }
              }
            }
          }
        }
      }),
      prisma.brand.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        brands,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
          hasNext: parseInt(page) * parseInt(limit) < total,
          hasPrev: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    logger.error('Get brands error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch brands'
    });
  }
});

// Get brand by ID or slug with products
router.get('/:identifier', optionalAuth, async (req, res) => {
  try {
    const { identifier } = req.params;
    const { 
      page = 1, 
      limit = 12, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      category,
      minPrice,
      maxPrice
    } = req.query;

    // Check if identifier is UUID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);
    
    const brand = await prisma.brand.findUnique({
      where: isUUID ? { id: identifier } : { slug: identifier }
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    if (!brand.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Brand not available'
      });
    }

    // Build product filters
    const productWhere = {
      brandId: brand.id,
      status: 'ACTIVE',
      isActive: true,
      ...(category && { categoryId: category }),
      ...(minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: parseFloat(minPrice) }),
          ...(maxPrice && { lte: parseFloat(maxPrice) })
        }
      }
    };

    // Build order by
    const orderBy = {};
    if (sortBy === 'price') {
      orderBy.price = sortOrder;
    } else if (sortBy === 'name') {
      orderBy.name = sortOrder;
    } else {
      orderBy[sortBy] = sortOrder;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [products, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where: productWhere,
        orderBy,
        skip,
        take: parseInt(limit),
        include: {
          category: {
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
      prisma.product.count({ where: productWhere })
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

    // Get available categories for this brand
    const availableCategories = await prisma.category.findMany({
      where: {
        products: {
          some: {
            brandId: brand.id,
            status: 'ACTIVE',
            isActive: true
          }
        }
      },
      select: { id: true, name: true, slug: true },
      orderBy: { name: 'asc' }
    });

    // Get price range
    const priceRange = await prisma.product.aggregate({
      where: productWhere,
      _min: { price: true },
      _max: { price: true }
    });

    res.json({
      success: true,
      data: {
        brand,
        products: productsWithRating,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: totalProducts,
          pages: Math.ceil(totalProducts / parseInt(limit)),
          hasNext: parseInt(page) * parseInt(limit) < totalProducts,
          hasPrev: parseInt(page) > 1
        },
        filters: {
          categories: availableCategories,
          priceRange: {
            min: priceRange._min.price || 0,
            max: priceRange._max.price || 0
          }
        }
      }
    });

  } catch (error) {
    logger.error('Get brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch brand'
    });
  }
});

// Create brand (Admin only)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, description, logo, website } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Brand name is required'
      });
    }

    // Generate slug
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingBrand = await prisma.brand.findUnique({
      where: { slug }
    });

    if (existingBrand) {
      return res.status(409).json({
        success: false,
        message: 'Brand with this name already exists'
      });
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        slug,
        description,
        logo,
        website
      }
    });

    logger.info(`Brand created: ${brand.name} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Brand created successfully',
      data: { brand }
    });

  } catch (error) {
    logger.error('Create brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create brand'
    });
  }
});

// Update brand (Admin only)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, logo, website, isActive } = req.body;

    const brand = await prisma.brand.findUnique({
      where: { id }
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    // Generate new slug if name changed
    let slug = brand.slug;
    if (name && name !== brand.name) {
      slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: {
        ...(name && { name, slug }),
        ...(description !== undefined && { description }),
        ...(logo !== undefined && { logo }),
        ...(website !== undefined && { website }),
        ...(isActive !== undefined && { isActive })
      }
    });

    logger.info(`Brand updated: ${updatedBrand.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Brand updated successfully',
      data: { brand: updatedBrand }
    });

  } catch (error) {
    logger.error('Update brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update brand'
    });
  }
});

// Delete brand (Admin only)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await prisma.brand.findUnique({
      where: { id },
      include: {
        products: true
      }
    });

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found'
      });
    }

    // Check if brand has products
    if (brand.products.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete brand with products. Remove products from this brand first.'
      });
    }

    await prisma.brand.delete({
      where: { id }
    });

    logger.info(`Brand deleted: ${brand.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Brand deleted successfully'
    });

  } catch (error) {
    logger.error('Delete brand error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete brand'
    });
  }
});

export default router;
