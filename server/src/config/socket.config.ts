import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { logger } from '../utils/logger.util';
import { config } from './index.config';

let io: SocketIOServer | null = null;

/**
 * Initialize Socket.IO server
 * @param httpServer - HTTP server instance
 * @returns Socket.IO server instance
 */
export const initializeSocket = (httpServer: HTTPServer): SocketIOServer => {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: config.clientUrl || '*',
      credentials: true,
      methods: ['GET', 'POST'],
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  io.on('connection', socket => {
    logger.info(`Socket connected: ${socket.id}`);

    // Join admin room for authenticated users
    socket.on('join:admin', () => {
      socket.join('admin-room');
      logger.info(`Socket ${socket.id} joined admin room`);
      socket.emit('joined:admin', { message: 'Successfully joined admin room' });
    });

    // Leave admin room
    socket.on('leave:admin', () => {
      socket.leave('admin-room');
      logger.info(`Socket ${socket.id} left admin room`);
    });

    // Handle disconnection
    socket.on('disconnect', reason => {
      logger.info(`Socket disconnected: ${socket.id}, Reason: ${reason}`);
    });

    // Handle errors
    socket.on('error', error => {
      logger.error(`Socket error: ${socket.id}`, error);
    });
  });

  logger.info('Socket.IO initialized successfully');
  return io;
};

/**
 * Get Socket.IO server instance
 * @returns Socket.IO server instance or null if not initialized
 */
export const getIO = (): SocketIOServer | null => {
  if (!io) {
    logger.warn('Socket.IO not initialized. Call initializeSocket first.');
  }
  return io;
};

/**
 * Emit event to all connected clients
 */
export const emitToAll = (event: string, data: any) => {
  if (io) {
    io.emit(event, data);
    logger.info(`Emitted ${event} to all clients`);
  }
};

/**
 * Emit event to admin room only
 */
export const emitToAdmins = (event: string, data: any) => {
  if (io) {
    io.to('admin-room').emit(event, data);
    logger.info(`Emitted ${event} to admin room`);
  }
};

/**
 * Socket.IO event types for real-time notifications
 */
export const SocketEvents = {
  // Projects
  PROJECT_CREATED: 'project:created',
  PROJECT_UPDATED: 'project:updated',
  PROJECT_DELETED: 'project:deleted',
  PROJECT_RESTORED: 'project:restored',

  // Blogs
  BLOG_CREATED: 'blog:created',
  BLOG_UPDATED: 'blog:updated',
  BLOG_DELETED: 'blog:deleted',
  BLOG_RESTORED: 'blog:restored',

  // Services
  SERVICE_CREATED: 'service:created',
  SERVICE_UPDATED: 'service:updated',
  SERVICE_DELETED: 'service:deleted',

  // Skills
  SKILL_CREATED: 'skill:created',
  SKILL_UPDATED: 'skill:updated',
  SKILL_DELETED: 'skill:deleted',

  // Resume
  RESUME_UPDATED: 'resume:updated',
  EDUCATION_CREATED: 'education:created',
  EDUCATION_UPDATED: 'education:updated',
  EDUCATION_DELETED: 'education:deleted',
  EXPERIENCE_CREATED: 'experience:created',
  EXPERIENCE_UPDATED: 'experience:updated',
  EXPERIENCE_DELETED: 'experience:deleted',

  // Testimonials
  TESTIMONIAL_CREATED: 'testimonial:created',
  TESTIMONIAL_UPDATED: 'testimonial:updated',
  TESTIMONIAL_DELETED: 'testimonial:deleted',

  // FAQ
  FAQ_CREATED: 'faq:created',
  FAQ_UPDATED: 'faq:updated',
  FAQ_DELETED: 'faq:deleted',

  // Trash
  TRASH_RESTORED: 'trash:restored',
  TRASH_PERMANENTLY_DELETED: 'trash:permanently-deleted',
  TRASH_CLEANED: 'trash:cleaned',

  // System
  MAINTENANCE_TOGGLED: 'maintenance:toggled',
} as const;
