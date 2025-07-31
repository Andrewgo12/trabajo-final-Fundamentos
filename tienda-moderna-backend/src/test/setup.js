import { beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Create test database client
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

// Global test setup
beforeAll(async () => {
  // Connect to test database
  await prisma.$connect();
  
  // Run migrations
  // Note: In a real setup, you'd run migrations here
  console.log('🧪 Test database connected');
});

// Global test teardown
afterAll(async () => {
  // Disconnect from test database
  await prisma.$disconnect();
  console.log('🧪 Test database disconnected');
});

// Clean up before each test
beforeEach(async () => {
  // Clean up test data
  // Note: Be careful with the order due to foreign key constraints
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productAttribute.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.address.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.user.deleteMany();
});

// Clean up after each test
afterEach(async () => {
  // Additional cleanup if needed
});

// Export test utilities
export { prisma };

// Test data factories
export const createTestUser = async (overrides = {}) => {
  return await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: '$2a$12$hashedpassword',
      firstName: 'Test',
      lastName: 'User',
      role: 'CUSTOMER',
      emailVerified: true,
      isActive: true,
      ...overrides
    }
  });
};

export const createTestAdmin = async (overrides = {}) => {
  return await createTestUser({
    email: 'admin@example.com',
    role: 'ADMIN',
    ...overrides
  });
};

export const createTestCategory = async (overrides = {}) => {
  return await prisma.category.create({
    data: {
      name: 'Test Category',
      slug: 'test-category',
      description: 'Test category description',
      isActive: true,
      ...overrides
    }
  });
};

export const createTestBrand = async (overrides = {}) => {
  return await prisma.brand.create({
    data: {
      name: 'Test Brand',
      slug: 'test-brand',
      description: 'Test brand description',
      isActive: true,
      ...overrides
    }
  });
};

export const createTestProduct = async (categoryId, brandId, overrides = {}) => {
  return await prisma.product.create({
    data: {
      name: 'Test Product',
      slug: 'test-product',
      description: 'Test product description',
      sku: 'TEST-001',
      price: 10.99,
      quantity: 100,
      categoryId,
      brandId,
      status: 'ACTIVE',
      isActive: true,
      ...overrides
    }
  });
};

export const createTestOrder = async (userId, overrides = {}) => {
  return await prisma.order.create({
    data: {
      orderNumber: 'TEST-001',
      userId,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      subtotal: 10.99,
      taxAmount: 2.08,
      shippingAmount: 5.00,
      discountAmount: 0,
      totalAmount: 18.07,
      ...overrides
    }
  });
};

// Mock JWT tokens for testing
export const generateTestToken = (userId, role = 'CUSTOMER') => {
  // In a real test, you'd use the actual JWT generation
  return `test-token-${userId}-${role}`;
};

// Test request helpers
export const createAuthHeaders = (token) => {
  return {
    Authorization: `Bearer ${token}`
  };
};

// Database cleanup utility
export const cleanupDatabase = async () => {
  const tablenames = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables WHERE schemaname='public'
  `;
  
  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
      } catch (error) {
        console.log({ error });
      }
    }
  }
};
