import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';
import { getPrismaClient, withTransaction } from '../config/database.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/errors.js';
import { sendEmail } from '../services/emailService.js';
import { generateOrderNumber } from '../utils/orderUtils.js';

const router = express.Router();
const prisma = getPrismaClient();

// Create order validation
const createOrderValidation = [
  body('shippingAddress').isObject().withMessage('Shipping address is required'),
  body('shippingAddress.firstName').trim().isLength({ min: 2 }).withMessage('First name is required'),
  body('shippingAddress.lastName').trim().isLength({ min: 2 }).withMessage('Last name is required'),
  body('shippingAddress.address1').trim().isLength({ min: 5 }).withMessage('Address is required'),
  body('shippingAddress.city').trim().isLength({ min: 2 }).withMessage('City is required'),
  body('shippingAddress.state').trim().isLength({ min: 2 }).withMessage('State is required'),
  body('shippingAddress.postalCode').trim().isLength({ min: 5 }).withMessage('Postal code is required'),
  body('shippingAddress.phone').optional().isMobilePhone('es-CO').withMessage('Valid phone number required'),
  body('paymentMethod').isIn(['card', 'pse', 'cash']).withMessage('Valid payment method required')
];

// Get user's orders
router.get('/', authenticate, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status,
      startDate,
      endDate 
    } = req.query;

    const where = {
      userId: req.user.id,
      ...(status && { status }),
      ...(startDate || endDate) && {
        createdAt: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) })
        }
      }
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  slug: true,
                  images: {
                    take: 1,
                    orderBy: { sortOrder: 'asc' }
                  }
                }
              }
            }
          },
          shippingAddress: true
        }
      }),
      prisma.order.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        orders,
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
    logger.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// Get single order
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                  orderBy: { sortOrder: 'asc' }
                },
                brand: {
                  select: { name: true, slug: true }
                }
              }
            }
          }
        },
        shippingAddress: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order or is admin
    if (order.userId !== req.user.id && !['ADMIN', 'SUPER_ADMIN'].includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: { order }
    });

  } catch (error) {
    logger.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch order'
    });
  }
});

// Create order from cart
router.post('/', authenticate, createOrderValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { shippingAddress, billingAddress, paymentMethod, notes, couponCode } = req.body;

    // Get user's cart items
    const cartItems = await prisma.cartItem.findMany({
      where: { userId: req.user.id },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate stock availability
    for (const item of cartItems) {
      if (item.product.trackQuantity && item.product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${item.product.name}. Only ${item.product.quantity} available.`
        });
      }

      if (item.product.status !== 'ACTIVE' || !item.product.isActive) {
        return res.status(400).json({
          success: false,
          message: `Product ${item.product.name} is no longer available`
        });
      }
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = cartItems.map(item => {
      const itemTotal = parseFloat(item.product.price) * item.quantity;
      subtotal += itemTotal;
      
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.price,
        total: itemTotal
      };
    });

    // Apply coupon if provided
    let discountAmount = 0;
    if (couponCode) {
      // TODO: Implement coupon validation and discount calculation
      // For now, we'll skip this
    }

    // Calculate tax (19% IVA in Colombia)
    const taxRate = 0.19;
    const taxAmount = subtotal * taxRate;

    // Calculate shipping (free for orders over $50,000)
    const shippingAmount = subtotal >= 50000 ? 0 : 5000;

    const totalAmount = subtotal + taxAmount + shippingAmount - discountAmount;

    // Create order in transaction
    const order = await withTransaction(async (tx) => {
      // Create shipping address
      const shippingAddr = await tx.address.create({
        data: {
          userId: req.user.id,
          type: 'SHIPPING',
          ...shippingAddress
        }
      });

      // Create billing address if different
      let billingAddr = shippingAddr;
      if (billingAddress && billingAddress !== shippingAddress) {
        billingAddr = await tx.address.create({
          data: {
            userId: req.user.id,
            type: 'BILLING',
            ...billingAddress
          }
        });
      }

      // Generate order number
      const orderNumber = await generateOrderNumber();

      // Create order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: req.user.id,
          status: 'PENDING',
          paymentStatus: 'PENDING',
          paymentMethod,
          subtotal,
          taxAmount,
          shippingAmount,
          discountAmount,
          totalAmount,
          notes,
          shippingAddressId: shippingAddr.id,
          billingAddressId: billingAddr.id,
          items: {
            create: orderItems
          }
        },
        include: {
          items: {
            include: {
              product: {
                include: {
                  images: {
                    take: 1,
                    orderBy: { sortOrder: 'asc' }
                  }
                }
              }
            }
          },
          shippingAddress: true
        }
      });

      // Update product quantities
      for (const item of cartItems) {
        if (item.product.trackQuantity) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              quantity: {
                decrement: item.quantity
              }
            }
          });
        }
      }

      // Clear cart
      await tx.cartItem.deleteMany({
        where: { userId: req.user.id }
      });

      return newOrder;
    });

    // Send order confirmation email
    try {
      await sendEmail({
        to: req.user.email,
        subject: `Order Confirmation - ${order.orderNumber}`,
        template: 'order-confirmation',
        data: {
          firstName: req.user.firstName,
          order,
          orderUrl: `${process.env.FRONTEND_URL}/orders/${order.id}`
        }
      });
    } catch (emailError) {
      logger.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order creation if email fails
    }

    logger.info(`Order created: ${order.orderNumber} by ${req.user.email}`);

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: { order }
    });

  } catch (error) {
    logger.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
});

// Update order status (Admin only)
router.patch('/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status, paymentStatus, notes } = req.body;

    const validStatuses = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED'];
    const validPaymentStatuses = ['PENDING', 'PAID', 'FAILED', 'REFUNDED', 'PARTIALLY_REFUNDED'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status'
      });
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: { user: true }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(notes && { notes })
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                  orderBy: { sortOrder: 'asc' }
                }
              }
            }
          }
        },
        shippingAddress: true
      }
    });

    // Send status update email
    if (status && status !== order.status) {
      try {
        await sendEmail({
          to: order.user.email,
          subject: `Order Update - ${order.orderNumber}`,
          template: 'order-status-update',
          data: {
            firstName: order.user.firstName,
            order: updatedOrder,
            oldStatus: order.status,
            newStatus: status,
            orderUrl: `${process.env.FRONTEND_URL}/orders/${order.id}`
          }
        });
      } catch (emailError) {
        logger.error('Failed to send order status update email:', emailError);
      }
    }

    logger.info(`Order status updated: ${order.orderNumber} to ${status} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Order status updated successfully',
      data: { order: updatedOrder }
    });

  } catch (error) {
    logger.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update order status'
    });
  }
});

// Cancel order
router.patch('/:id/cancel', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: { include: { product: true } } }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Check if order can be cancelled
    if (!['PENDING', 'CONFIRMED'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    // Cancel order and restore inventory
    const cancelledOrder = await withTransaction(async (tx) => {
      // Update order status
      const updated = await tx.order.update({
        where: { id },
        data: {
          status: 'CANCELLED',
          notes: reason ? `Cancelled by customer: ${reason}` : 'Cancelled by customer'
        }
      });

      // Restore product quantities
      for (const item of order.items) {
        if (item.product.trackQuantity) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              quantity: {
                increment: item.quantity
              }
            }
          });
        }
      }

      return updated;
    });

    logger.info(`Order cancelled: ${order.orderNumber} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order: cancelledOrder }
    });

  } catch (error) {
    logger.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
});

export default router;
