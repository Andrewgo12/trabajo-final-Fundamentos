import { AppError } from '../utils/errors.js';

// 404 Not Found middleware
export const notFound = (req, res, next) => {
  const error = new AppError(`Not found - ${req.originalUrl}`, 404);
  next(error);
};

export default notFound;
