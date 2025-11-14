import dotenv from 'dotenv';

import app from './app';
import { config } from './config/index.config';
import { logger } from './utils/logger.util';

// Load environment variables
dotenv.config();

// Start server
const PORT = config.port;

const server = app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT} in ${config.env} mode`);
  logger.info(`📡 API endpoint: http://localhost:${PORT}/api/${config.apiVersion}`);
  logger.info(`🏥 Health check: http://localhost:${PORT}/api/${config.apiVersion}/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('💤 Process terminated!');
  });
});
