import cron from 'node-cron';
import { TrashServices } from '../app/modules/trash/trash.service';
import { logger } from './logger.util';

export const startCronJobs = () => {
  // Run daily at 2:00 AM to cleanup expired trash items (older than 31 days)
  cron.schedule('0 2 * * *', async () => {
    try {
      logger.info('Starting scheduled trash cleanup...');
      const result = await TrashServices.cleanupExpiredTrash();
      logger.info(`Trash cleanup completed: ${result.deletedCount} items permanently deleted`);
    } catch (error) {
      logger.error('Error during scheduled trash cleanup:', error);
    }
  });

  logger.info('Cron jobs initialized: Daily trash cleanup at 2:00 AM');
};
