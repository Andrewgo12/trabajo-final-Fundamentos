import express from 'express';
import { body, validationResult } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';
import { getPrismaClient, searchWithPagination } from '../config/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const prisma = getPrismaClient();

// Get all users (Admin only)
router.get('/users', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      role,
      isActive,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const where = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } }
        ]
      }),
      ...(role && { role }),
      ...(isActive !== undefined && { isActive: isActive === 'true' })
    };

    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    const result = await searchWithPagination('user', {
      where,
      orderBy,
      page: parseInt(page),
      limit: parseInt(limit),
      include: {
        orders: {
          select: { id: true, totalAmount: true, status: true },
          where: { status: { in: ['DELIVERED', 'CONFIRMED'] } }
        },
        _count: {
          select: { orders: true }
        }
      }
    });

    // Calculate user stats
    const usersWithStats = result.items.map(user => {
      const totalSpent = user.orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0);
      return {
        ...user,
        totalSpent,
        orderCount: user._count.orders,
        orders: undefined,
        _count: undefined,
        password: undefined
      };
    });

    res.json({
      success: true,
      data: {
        users: usersWithStats,
        pagination: result.pagination
      }
    });

  } catch (error) {
    logger.error('Get admin users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// Update user role (Super Admin only)
router.patch('/users/:id/role', authenticate, authorize('SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const validRoles = ['CUSTOMER', 'ADMIN', 'SUPER_ADMIN'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    logger.info(`User role updated: ${user.email} to ${role} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'User role updated successfully',
      data: { user: updatedUser }
    });

  } catch (error) {
    logger.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user role'
    });
  }
});

// Toggle user active status (Admin only)
router.patch('/users/:id/status', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive must be a boolean value'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deactivating super admins
    if (user.role === 'SUPER_ADMIN' && !isActive) {
      return res.status(403).json({
        success: false,
        message: 'Cannot deactivate super admin users'
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    logger.info(`User status updated: ${user.email} to ${isActive ? 'active' : 'inactive'} by ${req.user.email}`);

    res.json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: { user: updatedUser }
    });

  } catch (error) {
    logger.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status'
    });
  }
});

// Get all orders (Admin only)
router.get('/orders', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      paymentStatus,
      search,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const where = {
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      ...(search && {
        OR: [
          { orderNumber: { contains: search, mode: 'insensitive' } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { user: { firstName: { contains: search, mode: 'insensitive' } } },
          { user: { lastName: { contains: search, mode: 'insensitive' } } }
        ]
      }),
      ...(startDate || endDate) && {
        createdAt: {
          ...(startDate && { gte: new Date(startDate) }),
          ...(endDate && { lte: new Date(endDate) })
        }
      }
    };

    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    const result = await searchWithPagination('order', {
      where,
      orderBy,
      page: parseInt(page),
      limit: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
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
    });

    res.json({
      success: true,
      data: {
        orders: result.items,
        pagination: result.pagination
      }
    });

  } catch (error) {
    logger.error('Get admin orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
});

// Get all products (Admin only)
router.get('/products', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      category,
      brand,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const where = {
      ...(status && { status }),
      ...(category && { categoryId: category }),
      ...(brand && { brandId: brand }),
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } }
        ]
      })
    };

    const orderBy = {};
    orderBy[sortBy] = sortOrder;

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
          take: 1
        },
        _count: {
          select: { reviews: true, orderItems: true }
        }
      }
    });

    res.json({
      success: true,
      data: {
        products: result.items,
        pagination: result.pagination
      }
    });

  } catch (error) {
    logger.error('Get admin products error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
});

// Get all reviews (Admin only)
router.get('/reviews', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      isApproved,
      rating,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const where = {
      ...(isApproved !== undefined && { isApproved: isApproved === 'true' }),
      ...(rating && { rating: parseInt(rating) }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { comment: { contains: search, mode: 'insensitive' } },
          { user: { email: { contains: search, mode: 'insensitive' } } },
          { product: { name: { contains: search, mode: 'insensitive' } } }
        ]
      })
    };

    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    const result = await searchWithPagination('review', {
      where,
      orderBy,
      page: parseInt(page),
      limit: parseInt(limit),
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            avatar: true
          }
        },
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
    });

    res.json({
      success: true,
      data: {
        reviews: result.items,
        pagination: result.pagination
      }
    });

  } catch (error) {
    logger.error('Get admin reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch reviews'
    });
  }
});

// System stats (Admin only)
router.get('/stats', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      pendingReviews
    ] = await Promise.all([
      prisma.user.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.aggregate({
        where: { status: { in: ['DELIVERED', 'CONFIRMED'] } },
        _sum: { totalAmount: true }
      }),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.product.count({
        where: {
          trackQuantity: true,
          quantity: { lte: 10 },
          isActive: true
        }
      }),
      prisma.review.count({ where: { isApproved: false } })
    ]);

    const stats = {
      users: {
        total: totalUsers
      },
      products: {
        total: totalProducts,
        lowStock: lowStockProducts
      },
      orders: {
        total: totalOrders,
        pending: pendingOrders
      },
      revenue: {
        total: parseFloat(totalRevenue._sum.totalAmount || 0)
      },
      reviews: {
        pending: pendingReviews
      }
    };

    res.json({
      success: true,
      data: { stats }
    });

  } catch (error) {
    logger.error('Get admin stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch system stats'
    });
  }
});

export default router;
