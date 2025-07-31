import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Generate email verification token
export const generateVerificationToken = (userId) => {
  return jwt.sign(
    { userId, type: 'email_verification' },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Generate password reset token
export const generateResetToken = (userId) => {
  return jwt.sign(
    { userId, type: 'password_reset' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Verify token
export const verifyToken = (token, expectedType = null) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    if (expectedType && decoded.type !== expectedType) {
      throw new Error('Invalid token type');
    }
    
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

// Generate random token
export const generateRandomToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

// Generate API key
export const generateApiKey = () => {
  const prefix = 'tm_';
  const randomPart = crypto.randomBytes(24).toString('hex');
  return prefix + randomPart;
};

// Hash token for storage
export const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

// Generate secure random string
export const generateSecureRandom = (length = 16) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, chars.length);
    result += chars[randomIndex];
  }
  
  return result;
};

// Generate OTP
export const generateOTP = (length = 6) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, digits.length);
    otp += digits[randomIndex];
  }
  
  return otp;
};

// Validate token format
export const isValidTokenFormat = (token, expectedPrefix = null) => {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  if (expectedPrefix && !token.startsWith(expectedPrefix)) {
    return false;
  }
  
  // Check if token has reasonable length
  if (token.length < 10 || token.length > 500) {
    return false;
  }
  
  return true;
};

// Create session token
export const createSessionToken = (userId, sessionData = {}) => {
  const payload = {
    userId,
    sessionId: generateSecureRandom(16),
    type: 'session',
    ...sessionData
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Decode token without verification (for debugging)
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Get token expiration time
export const getTokenExpiration = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Generate refresh token
export const generateRefreshToken = () => {
  return crypto.randomBytes(40).toString('hex');
};

// Token blacklist (in production, use Redis)
const tokenBlacklist = new Set();

// Add token to blacklist
export const blacklistToken = (token) => {
  tokenBlacklist.add(token);
};

// Check if token is blacklisted
export const isTokenBlacklisted = (token) => {
  return tokenBlacklist.has(token);
};

// Clear expired tokens from blacklist (should be run periodically)
export const clearExpiredBlacklistedTokens = () => {
  const tokensToRemove = [];
  
  for (const token of tokenBlacklist) {
    if (isTokenExpired(token)) {
      tokensToRemove.push(token);
    }
  }
  
  tokensToRemove.forEach(token => tokenBlacklist.delete(token));
  
  return tokensToRemove.length;
};

export default {
  generateVerificationToken,
  generateResetToken,
  verifyToken,
  generateRandomToken,
  generateApiKey,
  hashToken,
  generateSecureRandom,
  generateOTP,
  isValidTokenFormat,
  createSessionToken,
  decodeToken,
  isTokenExpired,
  getTokenExpiration,
  generateRefreshToken,
  blacklistToken,
  isTokenBlacklisted,
  clearExpiredBlacklistedTokens
};
