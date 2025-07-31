import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { getPrismaClient } from '../config/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const prisma = getPrismaClient();

// Get user's wishlist
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 12 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [wishlistItems, total] = await Promise.all([
      prisma.wishlistItem.findMany({
        where: { userId: req.user.id },
        skip,
        take: parseInt(limit),
        include: {
          product: {
            include: {
              images: {
                orderBy: { sortOrder: 'asc' },
                take: 1
              },
              brand: {
                select: { name: true, slug: true }
              },
              category: {
                select: { name: true, slug: true }
              },
              reviews: {
                select: { rating: true },
                where: { isApproved: true }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      prisma.wishlistItem.count({
        where: { userId: req.user.id }
      })
    ]);

    // Calculate ratings and check availability
    const itemsWithDetails = wishlistItems.map(item => {
      const ratings = item.product.reviews.map(r => r.rating);
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0;

      return {
        ...item,
        product: {
          ...item.product,
          rating: Math.round(avgRating * 10) / 10,
          reviewCount: ratings.length,
          inStock: item.product.quantity > 0,
          isAvailable: item.product.status === 'ACTIVE' && item.product.isActive,
          reviews: undefined
        }
      };
    });

    res.json({
      success: true,
      data: {
        items: itemsWithDetails,
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
    logger.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wishlist'
    });
  }
});

// Add item to wishlist
router.post('/items', authenticate, async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if item already in wishlist
    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId
        }
      }
    });

    if (existingItem) {
      return res.status(409).json({
        success: false,
        message: 'Product already in wishlist'
      });
    }

    // Add to wishlist
    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        userId: req.user.id,
        productId
      },
      include: {
        product: {
          include: {
            images: {
              orderBy: { sortOrder: 'asc' },
              take: 1
            },
            brand: {
              select: { name: true, slug: true }
            }
          }
        }
      }
    });

    logger.info(`Item added to wishlist: ${product.name} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Item added to wishlist successfully',
      data: { wishlistItem }
    });

  } catch (error) {
    logger.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to wishlist'
    });
  }
});

// Remove item from wishlist
router.delete('/items/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Find wishlist item
    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found'
      });
    }

    // Check if user owns this wishlist item
    if (wishlistItem.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Remove item
    await prisma.wishlistItem.delete({
      where: { id }
    });

    logger.info(`Item removed from wishlist: ${wishlistItem.product.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Item removed from wishlist successfully'
    });

  } catch (error) {
    logger.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from wishlist'
    });
  }
});

// Remove item by product ID
router.delete('/products/:productId', authenticate, async (req, res) => {
  try {
    const { productId } = req.params;

    // Find and remove wishlist item
    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId
        }
      },
      include: { product: true }
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in wishlist'
      });
    }

    await prisma.wishlistItem.delete({
      where: { id: wishlistItem.id }
    });

    logger.info(`Item removed from wishlist: ${wishlistItem.product.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Item removed from wishlist successfully'
    });

  } catch (error) {
    logger.error('Remove from wishlist by product ID error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from wishlist'
    });
  }
});

// Clear entire wishlist
router.delete('/', authenticate, async (req, res) => {
  try {
    const deletedItems = await prisma.wishlistItem.deleteMany({
      where: { userId: req.user.id }
    });

    logger.info(`Wishlist cleared: ${deletedItems.count} items by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Wishlist cleared successfully',
      data: { deletedCount: deletedItems.count }
    });

  } catch (error) {
    logger.error('Clear wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear wishlist'
    });
  }
});

// Move item to cart
router.post('/items/:id/move-to-cart', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity = 1 } = req.body;

    // Find wishlist item
    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!wishlistItem) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist item not found'
      });
    }

    // Check if user owns this wishlist item
    if (wishlistItem.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check product availability
    if (wishlistItem.product.status !== 'ACTIVE' || !wishlistItem.product.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Product is not available'
      });
    }

    if (wishlistItem.product.trackQuantity && wishlistItem.product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${wishlistItem.product.quantity} items available in stock`
      });
    }

    // Check if item already in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: wishlistItem.productId
        }
      }
    });

    if (existingCartItem) {
      // Update cart quantity
      const newQuantity = existingCartItem.quantity + quantity;
      
      if (wishlistItem.product.trackQuantity && wishlistItem.product.quantity < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${wishlistItem.product.quantity} items available in stock`
        });
      }

      await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity }
      });
    } else {
      // Add to cart
      await prisma.cartItem.create({
        data: {
          userId: req.user.id,
          productId: wishlistItem.productId,
          quantity
        }
      });
    }

    // Remove from wishlist
    await prisma.wishlistItem.delete({
      where: { id }
    });

    logger.info(`Item moved to cart: ${wishlistItem.product.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Item moved to cart successfully'
    });

  } catch (error) {
    logger.error('Move to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to move item to cart'
    });
  }
});

// Check if product is in wishlist
router.get('/check/:productId', authenticate, async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId
        }
      }
    });

    res.json({
      success: true,
      data: {
        inWishlist: !!wishlistItem,
        wishlistItemId: wishlistItem?.id || null
      }
    });

  } catch (error) {
    logger.error('Check wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check wishlist status'
    });
  }
});

// Get wishlist summary (for header display)
router.get('/summary', authenticate, async (req, res) => {
  try {
    const itemCount = await prisma.wishlistItem.count({
      where: { userId: req.user.id }
    });

    res.json({
      success: true,
      data: { itemCount }
    });

  } catch (error) {
    logger.error('Get wishlist summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch wishlist summary'
    });
  }
});

export default router;
