import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import { getPrismaClient } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/errors.js';

const router = express.Router();
const prisma = getPrismaClient();

// Get user's cart
router.get('/', authenticate, async (req, res) => {
  try {
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
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
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    // Calculate totals
    let subtotal = 0;
    let totalItems = 0;

    const itemsWithTotals = cartItems.map(item => {
      const itemTotal = parseFloat(item.product.price) * item.quantity;
      subtotal += itemTotal;
      totalItems += item.quantity;

      return {
        ...item,
        itemTotal,
        product: {
          ...item.product,
          inStock: item.product.quantity >= item.quantity,
          availableQuantity: item.product.quantity
        }
      };
    });

    // Calculate tax (19% IVA in Colombia)
    const taxRate = 0.19;
    const taxAmount = subtotal * taxRate;
    const total = subtotal + taxAmount;

    res.json({
      success: true,
      data: {
        items: itemsWithTotals,
        summary: {
          itemCount: cartItems.length,
          totalItems,
          subtotal: Math.round(subtotal * 100) / 100,
          taxAmount: Math.round(taxAmount * 100) / 100,
          total: Math.round(total * 100) / 100,
          currency: 'COP'
        }
      }
    });

  } catch (error) {
    logger.error('Get cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart'
    });
  }
});

// Add item to cart
router.post('/items', authenticate, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required'
      });
    }

    if (quantity < 1 || quantity > 99) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 1 and 99'
      });
    }

    // Check if product exists and is available
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.status !== 'ACTIVE' || !product.isActive) {
      return res.status(400).json({
        success: false,
        message: 'Product is not available'
      });
    }

    if (product.trackQuantity && product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.quantity} items available in stock`
      });
    }

    // Check if item already exists in cart
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId
        }
      }
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity
      const newQuantity = existingCartItem.quantity + quantity;
      
      if (product.trackQuantity && product.quantity < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.quantity} items available in stock`
        });
      }

      cartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: newQuantity },
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
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: req.user.id,
          productId,
          quantity
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
    }

    logger.info(`Item added to cart: ${product.name} (${quantity}) by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Item added to cart successfully',
      data: { cartItem }
    });

  } catch (error) {
    logger.error('Add to cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item to cart'
    });
  }
});

// Update cart item quantity
router.put('/items/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1 || quantity > 99) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be between 1 and 99'
      });
    }

    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Check if user owns this cart item
    if (cartItem.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check stock availability
    if (cartItem.product.trackQuantity && cartItem.product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${cartItem.product.quantity} items available in stock`
      });
    }

    // Update quantity
    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
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

    logger.info(`Cart item updated: ${cartItem.product.name} (${quantity}) by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Cart item updated successfully',
      data: { cartItem: updatedCartItem }
    });

  } catch (error) {
    logger.error('Update cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update cart item'
    });
  }
});

// Remove item from cart
router.delete('/items/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Check if user owns this cart item
    if (cartItem.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Remove item
    await prisma.cartItem.delete({
      where: { id }
    });

    logger.info(`Cart item removed: ${cartItem.product.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Item removed from cart successfully'
    });

  } catch (error) {
    logger.error('Remove cart item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove item from cart'
    });
  }
});

// Clear entire cart
router.delete('/', authenticate, async (req, res) => {
  try {
    const deletedItems = await prisma.cartItem.deleteMany({
      where: { userId: req.user.id }
    });

    logger.info(`Cart cleared: ${deletedItems.count} items by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Cart cleared successfully',
      data: { deletedCount: deletedItems.count }
    });

  } catch (error) {
    logger.error('Clear cart error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to clear cart'
    });
  }
});

// Move item to wishlist
router.post('/items/:id/move-to-wishlist', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // Find cart item
    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
      include: { product: true }
    });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: 'Cart item not found'
      });
    }

    // Check if user owns this cart item
    if (cartItem.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if item already in wishlist
    const existingWishlistItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId: req.user.id,
          productId: cartItem.productId
        }
      }
    });

    if (!existingWishlistItem) {
      // Add to wishlist
      await prisma.wishlistItem.create({
        data: {
          userId: req.user.id,
          productId: cartItem.productId
        }
      });
    }

    // Remove from cart
    await prisma.cartItem.delete({
      where: { id }
    });

    logger.info(`Item moved to wishlist: ${cartItem.product.name} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Item moved to wishlist successfully'
    });

  } catch (error) {
    logger.error('Move to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to move item to wishlist'
    });
  }
});

// Get cart summary (for header display)
router.get('/summary', authenticate, async (req, res) => {
  try {
    const cartSummary = await prisma.cartItem.aggregate({
      where: { userId: req.user.id },
      _count: { id: true },
      _sum: { quantity: true }
    });

    res.json({
      success: true,
      data: {
        itemCount: cartSummary._count.id || 0,
        totalItems: cartSummary._sum.quantity || 0
      }
    });

  } catch (error) {
    logger.error('Get cart summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cart summary'
    });
  }
});

export default router;
