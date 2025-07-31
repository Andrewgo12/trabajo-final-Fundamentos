// Custom error class
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Validation error
export class ValidationError extends AppError {
  constructor(message, errors = []) {
    super(message, 400);
    this.errors = errors;
  }
}

// Authentication error
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401);
  }
}

// Authorization error
export class AuthorizationError extends AppError {
  constructor(message = 'Access denied') {
    super(message, 403);
  }
}

// Not found error
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

// Conflict error
export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409);
  }
}

// Rate limit error
export class RateLimitError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429);
  }
}

// Database error
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500);
  }
}

// External service error
export class ExternalServiceError extends AppError {
  constructor(message = 'External service unavailable') {
    super(message, 502);
  }
}

// Error factory functions
export const createValidationError = (message, errors) => {
  return new ValidationError(message, errors);
};

export const createAuthenticationError = (message) => {
  return new AuthenticationError(message);
};

export const createAuthorizationError = (message) => {
  return new AuthorizationError(message);
};

export const createNotFoundError = (resource) => {
  return new NotFoundError(`${resource} not found`);
};

export const createConflictError = (resource) => {
  return new ConflictError(`${resource} already exists`);
};

// Error response formatter
export const formatErrorResponse = (error) => {
  const response = {
    success: false,
    message: error.message,
    status: error.status || 'error'
  };

  // Add validation errors if present
  if (error instanceof ValidationError && error.errors.length > 0) {
    response.errors = error.errors;
  }

  // Add stack trace in development
  if (process.env.NODE_ENV === 'development') {
    response.stack = error.stack;
  }

  return response;
};

// Common error messages
export const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: 'Invalid email or password',
  TOKEN_EXPIRED: 'Token has expired',
  TOKEN_INVALID: 'Invalid token',
  ACCESS_DENIED: 'Access denied',
  EMAIL_NOT_VERIFIED: 'Email verification required',
  
  // Validation
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please provide a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters long',
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  
  // Resources
  USER_NOT_FOUND: 'User not found',
  PRODUCT_NOT_FOUND: 'Product not found',
  ORDER_NOT_FOUND: 'Order not found',
  CATEGORY_NOT_FOUND: 'Category not found',
  
  // Conflicts
  EMAIL_EXISTS: 'Email already exists',
  SKU_EXISTS: 'SKU already exists',
  SLUG_EXISTS: 'Slug already exists',
  
  // Business logic
  INSUFFICIENT_STOCK: 'Insufficient stock available',
  CART_EMPTY: 'Cart is empty',
  ORDER_CANNOT_BE_CANCELLED: 'Order cannot be cancelled',
  PRODUCT_NOT_AVAILABLE: 'Product is not available',
  
  // File upload
  FILE_TOO_LARGE: 'File size exceeds limit',
  INVALID_FILE_TYPE: 'Invalid file type',
  UPLOAD_FAILED: 'File upload failed',
  
  // General
  INTERNAL_ERROR: 'Internal server error',
  BAD_REQUEST: 'Bad request',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  NOT_FOUND: 'Resource not found',
  METHOD_NOT_ALLOWED: 'Method not allowed',
  TOO_MANY_REQUESTS: 'Too many requests'
};

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
};

// Error handler for async functions
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Validation helper
export const validateRequired = (fields, data) => {
  const errors = [];
  
  fields.forEach(field => {
    if (!data[field] || data[field].toString().trim() === '') {
      errors.push({
        field,
        message: `${field} is required`
      });
    }
  });
  
  if (errors.length > 0) {
    throw new ValidationError('Validation failed', errors);
  }
};

// Database error handler
export const handleDatabaseError = (error) => {
  // Prisma specific errors
  if (error.code === 'P2002') {
    throw new ConflictError('Duplicate entry');
  }
  
  if (error.code === 'P2025') {
    throw new NotFoundError('Record not found');
  }
  
  if (error.code === 'P2003') {
    throw new ValidationError('Foreign key constraint failed');
  }
  
  // Generic database error
  throw new DatabaseError('Database operation failed');
};

export default AppError;
