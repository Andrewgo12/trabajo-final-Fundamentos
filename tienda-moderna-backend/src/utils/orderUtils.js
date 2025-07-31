import { getPrismaClient } from '../config/database.js';

const prisma = getPrismaClient();

// Generate unique order number
export const generateOrderNumber = async () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  // Get count of orders today
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  
  const todayOrderCount = await prisma.order.count({
    where: {
      createdAt: {
        gte: startOfDay,
        lt: endOfDay
      }
    }
  });
  
  const sequence = String(todayOrderCount + 1).padStart(4, '0');
  return `TM${year}${month}${day}${sequence}`;
};

// Calculate order totals
export const calculateOrderTotals = (items, taxRate = 0.19, shippingThreshold = 50000, shippingCost = 5000) => {
  const subtotal = items.reduce((sum, item) => {
    return sum + (parseFloat(item.price) * item.quantity);
  }, 0);
  
  const taxAmount = subtotal * taxRate;
  const shippingAmount = subtotal >= shippingThreshold ? 0 : shippingCost;
  const totalAmount = subtotal + taxAmount + shippingAmount;
  
  return {
    subtotal: Math.round(subtotal * 100) / 100,
    taxAmount: Math.round(taxAmount * 100) / 100,
    shippingAmount: Math.round(shippingAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100
  };
};

// Validate order items
export const validateOrderItems = async (items) => {
  const validatedItems = [];
  
  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId }
    });
    
    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }
    
    if (product.status !== 'ACTIVE' || !product.isActive) {
      throw new Error(`Product ${product.name} is not available`);
    }
    
    if (product.trackQuantity && product.quantity < item.quantity) {
      throw new Error(`Insufficient stock for ${product.name}. Only ${product.quantity} available.`);
    }
    
    validatedItems.push({
      ...item,
      product,
      price: product.price,
      total: parseFloat(product.price) * item.quantity
    });
  }
  
  return validatedItems;
};

// Order status transitions
export const ORDER_STATUS_TRANSITIONS = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: ['REFUNDED'],
  CANCELLED: [],
  REFUNDED: []
};

// Validate status transition
export const canTransitionStatus = (currentStatus, newStatus) => {
  return ORDER_STATUS_TRANSITIONS[currentStatus]?.includes(newStatus) || false;
};

// Get order status display info
export const getOrderStatusInfo = (status) => {
  const statusInfo = {
    PENDING: {
      label: 'Pending',
      color: 'warning',
      description: 'Order is being processed'
    },
    CONFIRMED: {
      label: 'Confirmed',
      color: 'info',
      description: 'Order has been confirmed'
    },
    PROCESSING: {
      label: 'Processing',
      color: 'primary',
      description: 'Order is being prepared'
    },
    SHIPPED: {
      label: 'Shipped',
      color: 'success',
      description: 'Order has been shipped'
    },
    DELIVERED: {
      label: 'Delivered',
      color: 'success',
      description: 'Order has been delivered'
    },
    CANCELLED: {
      label: 'Cancelled',
      color: 'danger',
      description: 'Order has been cancelled'
    },
    REFUNDED: {
      label: 'Refunded',
      color: 'secondary',
      description: 'Order has been refunded'
    }
  };
  
  return statusInfo[status] || statusInfo.PENDING;
};

// Calculate estimated delivery date
export const calculateEstimatedDelivery = (shippingMethod = 'standard') => {
  const now = new Date();
  let deliveryDays = 3; // Default standard shipping
  
  switch (shippingMethod) {
    case 'express':
      deliveryDays = 1;
      break;
    case 'priority':
      deliveryDays = 2;
      break;
    case 'standard':
    default:
      deliveryDays = 3;
      break;
  }
  
  const deliveryDate = new Date(now);
  deliveryDate.setDate(now.getDate() + deliveryDays);
  
  return deliveryDate;
};

// Format order for email
export const formatOrderForEmail = (order) => {
  return {
    ...order,
    formattedTotal: `$${order.totalAmount.toLocaleString()}`,
    formattedDate: new Date(order.createdAt).toLocaleDateString(),
    items: order.items.map(item => ({
      ...item,
      formattedPrice: `$${item.price.toLocaleString()}`,
      formattedTotal: `$${item.total.toLocaleString()}`
    }))
  };
};

export default {
  generateOrderNumber,
  calculateOrderTotals,
  validateOrderItems,
  canTransitionStatus,
  getOrderStatusInfo,
  calculateEstimatedDelivery,
  formatOrderForEmail
};
