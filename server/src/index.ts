import dotenv from 'dotenv';
import { Server } from 'http';

import app from './app';
import { config } from './config/index.config';
import { startCronJobs } from './utils/cron.util';
import { logger } from './utils/logger.util';

// Load environment variables
dotenv.config();

process.on('uncaughtException', error => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    // Start server
    const PORT = config.port;

    server = app.listen(PORT, () => {
      logger.info(`🚀 Server running on port ${PORT} in ${config.env} mode`);
      logger.info(`📡 API endpoint: http://localhost:${PORT}/api/${config.apiVersion}`);
      logger.info(`🏥 Health check: http://localhost:${PORT}/api/${config.apiVersion}/health`);

      // Start cron jobs
      startCronJobs();
    });
  } catch (err) {
    logger.error('Failed to start server', err);
  }

  process.on('unhandledRejection', error => {
    logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
    if (server) {
      server.close(() => {
        logger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(() => {
      logger.info('💤 Process terminated!');
    });
  }
});
