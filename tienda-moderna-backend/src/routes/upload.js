import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { uploadMiddleware } from '../middleware/upload.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Upload single image
router.post('/image', authenticate, uploadMiddleware.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    logger.info(`Image uploaded: ${req.file.filename} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        url: imageUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });

  } catch (error) {
    logger.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image'
    });
  }
});

// Upload multiple images
router.post('/images', authenticate, uploadMiddleware.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedImages = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype
    }));

    logger.info(`${req.files.length} images uploaded by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Images uploaded successfully',
      data: { images: uploadedImages }
    });

  } catch (error) {
    logger.error('Upload images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload images'
    });
  }
});

// Upload product images (Admin only)
router.post('/product-images', authenticate, authorize('ADMIN', 'SUPER_ADMIN'), uploadMiddleware.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadedImages = req.files.map((file, index) => ({
      url: `/uploads/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      sortOrder: index,
      alt: req.body.alt || file.originalname
    }));

    logger.info(`${req.files.length} product images uploaded by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Product images uploaded successfully',
      data: { images: uploadedImages }
    });

  } catch (error) {
    logger.error('Upload product images error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload product images'
    });
  }
});

// Upload document/file
router.post('/document', authenticate, uploadMiddleware.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const documentUrl = `/uploads/${req.file.filename}`;

    logger.info(`Document uploaded: ${req.file.filename} by ${req.user.email}`);

    res.json({
      success: true,
      message: 'Document uploaded successfully',
      data: {
        url: documentUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype
      }
    });

  } catch (error) {
    logger.error('Upload document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload document'
    });
  }
});

export default router;
