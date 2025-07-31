import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getPrismaClient } from '../config/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();
const prisma = getPrismaClient();

// Get dashboard analytics (Admin only)
router.get('/dashboard', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { period = '30d' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get key metrics
    const [
      totalUsers,
      newUsers,
      totalOrders,
      newOrders,
      totalRevenue,
      newRevenue,
      totalProducts,
      activeProducts,
      pendingOrders,
      completedOrders,
      cancelledOrders
    ] = await Promise.all([
      // Total users
      prisma.user.count(),
      // New users in period
      prisma.user.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      // Total orders
      prisma.order.count(),
      // New orders in period
      prisma.order.count({
        where: {
          createdAt: { gte: startDate }
        }
      }),
      // Total revenue
      prisma.order.aggregate({
        where: {
          status: { in: ['DELIVERED', 'CONFIRMED'] }
        },
        _sum: { totalAmount: true }
      }),
      // New revenue in period
      prisma.order.aggregate({
        where: {
          createdAt: { gte: startDate },
          status: { in: ['DELIVERED', 'CONFIRMED'] }
        },
        _sum: { totalAmount: true }
      }),
      // Total products
      prisma.product.count(),
      // Active products
      prisma.product.count({
        where: {
          status: 'ACTIVE',
          isActive: true
        }
      }),
      // Pending orders
      prisma.order.count({
        where: { status: 'PENDING' }
      }),
      // Completed orders
      prisma.order.count({
        where: { status: 'DELIVERED' }
      }),
      // Cancelled orders
      prisma.order.count({
        where: { status: 'CANCELLED' }
      })
    ]);

    // Get top products
    const topProducts = await prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: {
          createdAt: { gte: startDate },
          status: { in: ['DELIVERED', 'CONFIRMED'] }
        }
      },
      _sum: { quantity: true, total: true },
      orderBy: { _sum: { total: 'desc' } },
      take: 10
    });

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: { id: item.productId },
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' }
            }
          }
        });
        return {
          ...product,
          totalSold: item._sum.quantity,
          totalRevenue: item._sum.total
        };
      })
    );

    // Get sales by day for chart
    const salesByDay = await prisma.order.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: startDate },
        status: { in: ['DELIVERED', 'CONFIRMED'] }
      },
      _sum: { totalAmount: true },
      _count: { id: true }
    });

    // Process sales data for chart
    const chartData = salesByDay.reduce((acc, sale) => {
      const date = sale.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, revenue: 0, orders: 0 };
      }
      acc[date].revenue += parseFloat(sale._sum.totalAmount || 0);
      acc[date].orders += sale._count.id;
      return acc;
    }, {});

    const analytics = {
      overview: {
        totalUsers,
        newUsers,
        totalOrders,
        newOrders,
        totalRevenue: parseFloat(totalRevenue._sum.totalAmount || 0),
        newRevenue: parseFloat(newRevenue._sum.totalAmount || 0),
        totalProducts,
        activeProducts
      },
      orders: {
        pending: pendingOrders,
        completed: completedOrders,
        cancelled: cancelledOrders,
        total: totalOrders
      },
      topProducts: topProductsWithDetails,
      salesChart: Object.values(chartData).sort((a, b) => new Date(a.date) - new Date(b.date))
    };

    res.json({
      success: true,
      data: { analytics, period }
    });

  } catch (error) {
    logger.error('Get dashboard analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch analytics'
    });
  }
});

// Get sales analytics
router.get('/sales', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { startDate, endDate, groupBy = 'day' } = req.query;

    const dateFilter = {};
    if (startDate) dateFilter.gte = new Date(startDate);
    if (endDate) dateFilter.lte = new Date(endDate);

    const sales = await prisma.order.findMany({
      where: {
        ...(Object.keys(dateFilter).length > 0 && { createdAt: dateFilter }),
        status: { in: ['DELIVERED', 'CONFIRMED'] }
      },
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
        status: true
      },
      orderBy: { createdAt: 'asc' }
    });

    // Group sales data
    const groupedSales = sales.reduce((acc, sale) => {
      let key;
      const date = new Date(sale.createdAt);
      
      switch (groupBy) {
        case 'hour':
          key = `${date.toISOString().split('T')[0]} ${date.getHours()}:00`;
          break;
        case 'day':
          key = date.toISOString().split('T')[0];
          break;
        case 'week':
          const weekStart = new Date(date);
          weekStart.setDate(date.getDate() - date.getDay());
          key = weekStart.toISOString().split('T')[0];
          break;
        case 'month':
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          break;
        default:
          key = date.toISOString().split('T')[0];
      }

      if (!acc[key]) {
        acc[key] = { period: key, revenue: 0, orders: 0 };
      }
      acc[key].revenue += parseFloat(sale.totalAmount);
      acc[key].orders += 1;
      return acc;
    }, {});

    const salesData = Object.values(groupedSales).sort((a, b) => a.period.localeCompare(b.period));

    res.json({
      success: true,
      data: { sales: salesData, groupBy }
    });

  } catch (error) {
    logger.error('Get sales analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sales analytics'
    });
  }
});

// Get product analytics
router.get('/products', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    // Get product performance
    const productStats = await prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, total: true },
      _count: { id: true },
      orderBy: { _sum: { total: 'desc' } },
      take: parseInt(limit)
    });

    // Get product details
    const productsWithStats = await Promise.all(
      productStats.map(async (stat) => {
        const product = await prisma.product.findUnique({
          where: { id: stat.productId },
          select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            quantity: true,
            status: true,
            category: {
              select: { name: true }
            },
            brand: {
              select: { name: true }
            },
            images: {
              take: 1,
              orderBy: { sortOrder: 'asc' }
            }
          }
        });

        return {
          ...product,
          totalSold: stat._sum.quantity,
          totalRevenue: parseFloat(stat._sum.total),
          orderCount: stat._count.id
        };
      })
    );

    res.json({
      success: true,
      data: { products: productsWithStats }
    });

  } catch (error) {
    logger.error('Get product analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product analytics'
    });
  }
});

// Get user analytics
router.get('/users', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), async (req, res) => {
  try {
    const { period = '30d' } = req.query;

    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Get user registrations by day
    const userRegistrations = await prisma.user.groupBy({
      by: ['createdAt'],
      where: {
        createdAt: { gte: startDate }
      },
      _count: { id: true }
    });

    // Process registration data
    const registrationData = userRegistrations.reduce((acc, reg) => {
      const date = reg.createdAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { date, registrations: 0 };
      }
      acc[date].registrations += reg._count.id;
      return acc;
    }, {});

    // Get top customers
    const topCustomers = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true,
        orders: {
          where: {
            status: { in: ['DELIVERED', 'CONFIRMED'] }
          },
          select: {
            totalAmount: true
          }
        }
      },
      take: 10
    });

    const customersWithStats = topCustomers.map(customer => ({
      ...customer,
      totalSpent: customer.orders.reduce((sum, order) => sum + parseFloat(order.totalAmount), 0),
      orderCount: customer.orders.length,
      orders: undefined
    })).sort((a, b) => b.totalSpent - a.totalSpent);

    res.json({
      success: true,
      data: {
        registrations: Object.values(registrationData).sort((a, b) => new Date(a.date) - new Date(b.date)),
        topCustomers: customersWithStats,
        period
      }
    });

  } catch (error) {
    logger.error('Get user analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user analytics'
    });
  }
});

export default router;
