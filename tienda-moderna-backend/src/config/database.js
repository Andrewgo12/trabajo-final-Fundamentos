import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger.js';

// Prisma client instance
let prisma;

// Database connection configuration
const databaseConfig = {
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'info', 'warn', 'error']
    : ['error'],
  errorFormat: 'pretty',
};

// Create Prisma client
const createPrismaClient = () => {
  return new PrismaClient(databaseConfig);
};

// Connect to database
export const connectDatabase = async () => {
  try {
    if (!prisma) {
      prisma = createPrismaClient();
    }

    // Test the connection
    await prisma.$connect();
    logger.info('✅ Database connected successfully');

    // Run any pending migrations in production
    if (process.env.NODE_ENV === 'production') {
      logger.info('🔄 Checking for pending migrations...');
      // Note: In production, migrations should be run separately
      // This is just for demonstration
    }

    return prisma;
  } catch (error) {
    logger.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Disconnect from database
export const disconnectDatabase = async () => {
  try {
    if (prisma) {
      await prisma.$disconnect();
      logger.info('📴 Database disconnected');
    }
  } catch (error) {
    logger.error('❌ Error disconnecting from database:', error);
    throw error;
  }
};

// Get Prisma client instance
export const getPrismaClient = () => {
  if (!prisma) {
    prisma = createPrismaClient();
  }
  return prisma;
};

// Database health check
export const checkDatabaseHealth = async () => {
  try {
    const client = getPrismaClient();
    await client.$queryRaw`SELECT 1`;
    return { status: 'healthy', timestamp: new Date().toISOString() };
  } catch (error) {
    logger.error('Database health check failed:', error);
    return { 
      status: 'unhealthy', 
      error: error.message,
      timestamp: new Date().toISOString() 
    };
  }
};

// Transaction helper
export const withTransaction = async (callback) => {
  const client = getPrismaClient();
  return await client.$transaction(callback);
};

// Soft delete helper
export const softDelete = async (model, id) => {
  const client = getPrismaClient();
  return await client[model].update({
    where: { id },
    data: { 
      isActive: false,
      updatedAt: new Date()
    }
  });
};

// Bulk operations helper
export const bulkCreate = async (model, data) => {
  const client = getPrismaClient();
  return await client[model].createMany({
    data,
    skipDuplicates: true
  });
};

// Search helper with pagination
export const searchWithPagination = async (model, searchParams) => {
  const client = getPrismaClient();
  const {
    where = {},
    orderBy = { createdAt: 'desc' },
    page = 1,
    limit = 10,
    include = {}
  } = searchParams;

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    client[model].findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include
    }),
    client[model].count({ where })
  ]);

  return {
    items,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1
    }
  };
};

// Cache helper for frequently accessed data
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const getCachedData = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  return null;
};

export const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
};

export const clearCache = (pattern) => {
  if (pattern) {
    for (const key of cache.keys()) {
      if (key.includes(pattern)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

// Graceful shutdown
process.on('beforeExit', async () => {
  await disconnectDatabase();
});

process.on('SIGINT', async () => {
  await disconnectDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await disconnectDatabase();
  process.exit(0);
});

export default prisma;
