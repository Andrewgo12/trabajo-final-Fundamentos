import nodemailer from 'nodemailer';
import { logger } from '../utils/logger.js';

// Create transporter
const createTransporter = () => {
  if (process.env.SENDGRID_API_KEY) {
    // SendGrid configuration
    return nodemailer.createTransporter({
      service: 'SendGrid',
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  } else {
    // SMTP configuration
    return nodemailer.createTransporter({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
};

const transporter = createTransporter();

// Email templates
const emailTemplates = {
  'email-verification': {
    subject: 'Verify your email - Tienda Moderna',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Tienda Moderna!</h2>
        <p>Hi ${data.firstName},</p>
        <p>Thank you for registering with Tienda Moderna. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.verificationUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email
          </a>
        </div>
        <p>If you didn't create an account, you can safely ignore this email.</p>
        <p>Best regards,<br>The Tienda Moderna Team</p>
      </div>
    `
  },

  'password-reset': {
    subject: 'Reset your password - Tienda Moderna',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>Hi ${data.firstName},</p>
        <p>You requested to reset your password. Click the button below to set a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, you can safely ignore this email.</p>
        <p>Best regards,<br>The Tienda Moderna Team</p>
      </div>
    `
  },

  'order-confirmation': {
    subject: (data) => `Order Confirmation - ${data.order.orderNumber}`,
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Confirmation</h2>
        <p>Hi ${data.firstName},</p>
        <p>Thank you for your order! Here are the details:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Order #${data.order.orderNumber}</h3>
          <p><strong>Total:</strong> $${data.order.totalAmount}</p>
          <p><strong>Status:</strong> ${data.order.status}</p>
          <p><strong>Order Date:</strong> ${new Date(data.order.createdAt).toLocaleDateString()}</p>
        </div>

        <h3>Items Ordered:</h3>
        ${data.order.items.map(item => `
          <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
            <p><strong>${item.product.name}</strong></p>
            <p>Quantity: ${item.quantity} × $${item.price} = $${item.total}</p>
          </div>
        `).join('')}

        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.orderUrl}" 
             style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Order Details
          </a>
        </div>

        <p>We'll send you another email when your order ships.</p>
        <p>Best regards,<br>The Tienda Moderna Team</p>
      </div>
    `
  },

  'order-status-update': {
    subject: (data) => `Order Update - ${data.order.orderNumber}`,
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Order Status Update</h2>
        <p>Hi ${data.firstName},</p>
        <p>Your order status has been updated:</p>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <h3>Order #${data.order.orderNumber}</h3>
          <p><strong>Previous Status:</strong> ${data.oldStatus}</p>
          <p><strong>New Status:</strong> ${data.newStatus}</p>
          <p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${data.orderUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            View Order Details
          </a>
        </div>

        <p>Best regards,<br>The Tienda Moderna Team</p>
      </div>
    `
  },

  'welcome': {
    subject: 'Welcome to Tienda Moderna!',
    html: (data) => `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Tienda Moderna!</h2>
        <p>Hi ${data.firstName},</p>
        <p>Welcome to Tienda Moderna! We're excited to have you as part of our community.</p>
        <p>Here's what you can do with your account:</p>
        <ul>
          <li>Browse our extensive catalog of cleaning products</li>
          <li>Save items to your wishlist</li>
          <li>Track your orders</li>
          <li>Manage your addresses and payment methods</li>
          <li>Get exclusive offers and discounts</li>
        </ul>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Start Shopping
          </a>
        </div>

        <p>If you have any questions, feel free to contact our support team.</p>
        <p>Best regards,<br>The Tienda Moderna Team</p>
      </div>
    `
  }
};

// Send email function
export const sendEmail = async ({ to, subject, template, data, html, text }) => {
  try {
    let emailSubject = subject;
    let emailHtml = html;
    let emailText = text;

    // Use template if provided
    if (template && emailTemplates[template]) {
      const templateConfig = emailTemplates[template];
      emailSubject = typeof templateConfig.subject === 'function' 
        ? templateConfig.subject(data) 
        : templateConfig.subject;
      emailHtml = templateConfig.html(data);
    }

    const mailOptions = {
      from: `${process.env.FROM_NAME || 'Tienda Moderna'} <${process.env.FROM_EMAIL}>`,
      to,
      subject: emailSubject,
      html: emailHtml,
      text: emailText
    };

    const result = await transporter.sendMail(mailOptions);
    
    logger.info('Email sent successfully', {
      to,
      subject: emailSubject,
      messageId: result.messageId
    });

    return result;
  } catch (error) {
    logger.error('Email sending failed', {
      to,
      subject,
      error: error.message
    });
    throw error;
  }
};

// Send bulk emails
export const sendBulkEmails = async (emails) => {
  const results = [];
  
  for (const email of emails) {
    try {
      const result = await sendEmail(email);
      results.push({ success: true, email: email.to, result });
    } catch (error) {
      results.push({ success: false, email: email.to, error: error.message });
    }
  }
  
  return results;
};

// Verify email configuration
export const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    logger.info('Email configuration verified successfully');
    return true;
  } catch (error) {
    logger.error('Email configuration verification failed:', error);
    return false;
  }
};

// Email queue (for production use with Redis/Bull)
export const queueEmail = async (emailData) => {
  // TODO: Implement email queue with Redis/Bull for production
  // For now, send immediately
  return await sendEmail(emailData);
};

export default {
  sendEmail,
  sendBulkEmails,
  verifyEmailConfig,
  queueEmail
};
