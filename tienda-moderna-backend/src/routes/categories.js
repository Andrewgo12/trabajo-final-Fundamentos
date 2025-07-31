import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, authorize, optionalAuth } from '../middleware/auth.js';
import { getPrismaClient } from '../config/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const prisma = getPrismaClient();

// Get all categories with hierarchy
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { includeProducts = false, includeInactive = false } = req.query;

    const where = {
      ...(includeInactive !== 'true' && { isActive: true })
    };

    const categories = await prisma.category.findMany({
      where,
      orderBy: [
        { sortOrder: 'asc' },
        { name: 'asc' }
      ],
      include: {
        children: {
          where,
          orderBy: [
            { sortOrder: 'asc' },
            { name: 'asc' }
          ],
          include: {
            ...(includeProducts === 'true' && {
              products: {
                where: { status: 'ACTIVE', isActive: true },
                select: { id: true, name: true, slug: true, price: true },
                take: 5
              }
            }),
            _count: {
              select: { products: true }
            }
          }
        },
        ...(includeProducts === 'true' && {
          products: {
            where: { status: 'ACTIVE', isActive: true },
            select: { id: true, name: true, slug: true, price: true },
            take: 5
          }
        }),
        _count: {
          select: { products: true }
        }
      }
    });

    // Filter only parent categories (no parentId)
    const parentCategories = categories.filter(cat => !cat.parentId);

    res.json({
      success: true,
      data: { categories: parentCategories }
    });

  } catch (error) {
    logger.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories'
    });
  }
});

// Get category by ID or slug with products
router.get('/:identifier', optionalAuth, async (req, res) => {
  try {
    const { identifier } = req.params;
    const { 
      page = 1, 
      limit = 12, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      minPrice,
      maxPrice,
      brand
    } = req.query;

    // Check if identifier is UUID or slug
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(identifier);
    
    const category = await prisma.category.findUnique({
      where: isUUID ? { id: identifier } : { slug: identifier },
      include: {
        parent: true,
        children: {
          where: { isActive: true },
          orderBy: { name: 'asc' }
        }
      }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    if (!category.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Category not available'
      });
    }

    // Get all category IDs (including children) for product filtering
    const categoryIds = [category.id, ...category.children.map(child => child.id)];

    // Build product filters
    const productWhere = {
      categoryId: { in: categoryIds },
      status: 'ACTIVE',
      isActive: true,
      ...(brand && { brandId: brand }),
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

    // Get available brands in this category
    const availableBrands = await prisma.brand.findMany({
      where: {
        products: {
          some: {
            categoryId: { in: categoryIds },
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
        category,
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
          brands: availableBrands,
          priceRange: {
            min: priceRange._min.price || 0,
            max: priceRange._max.price || 0
          }
        }
      }
    });

  } catch (error) {
    logger.error('Get category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category'
    });
  }
});

// Create category (Admin only)
router.post('/', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { name, description, parentId, icon, image, sortOrder } = req.body;

    // Generate slug
    const slug = name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check if slug already exists
    const existingCategory = await prisma.category.findUnique({
      where: { slug }
    });

    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: 'Category with this name already exists'
      });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        parentId,
        icon,
        image,
        sortOrder: sortOrder || 0
      },
      include: {
        parent: true,
        children: true
      }
    });

    logger.info(`Category created: ${category.name} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category }
    });

  } catch (error) {
    logger.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category'
    });
  }
});

// Update category (Admin only)
router.put('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, parentId, icon, image, sortOrder, isActive } = req.body;

    const category = await prisma.category.findUnique({
      where: { id }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Generate new slug if name changed
    let slug = category.slug;
    if (name && name !== category.name) {
      slug = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        ...(name && { name, slug }),
        ...(description !== undefined && { description }),
        ...(parentId !== undefined && { parentId }),
        ...(icon !== undefined && { icon }),
        ...(image !== undefined && { image }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive })
      },
      include: {
        parent: true,
        children: true
      }
    });

    logger.info(`Category updated: ${updatedCategory.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: { category: updatedCategory }
    });

  } catch (error) {
    logger.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update category'
    });
  }
});

// Delete category (Admin only)
router.delete('/:id', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: true,
        children: true
      }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Check if category has products or children
    if (category.products.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with products. Move products to another category first.'
      });
    }

    if (category.children.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete category with subcategories. Delete subcategories first.'
      });
    }

    await prisma.category.delete({
      where: { id }
    });

    logger.info(`Category deleted: ${category.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    logger.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category'
    });
  }
});

export default router;
