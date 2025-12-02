/* eslint-disable @typescript-eslint/no-explicit-any */
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5050';

let socket: Socket | null = null;

/**
 * Initialize Socket.IO connection
 * Should be called once when the app starts (in layout or provider)
 */
export const initializeSocket = (token: string): Socket => {
  if (socket?.connected) {
    return socket;
  }

  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('✅ Connected to Socket.IO server');
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Disconnected from Socket.IO:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('Socket.IO connection error:', error.message);
  });

  socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
  });

  return socket;
};

/**
 * Get the current socket instance
 */
export const getSocket = (): Socket | null => {
  return socket;
};

/**
 * Disconnect socket
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

/**
 * Subscribe to a specific event
 */
export const subscribeToEvent = (event: string, callback: (data: any) => void): void => {
  if (socket) {
    socket.on(event, callback);
  }
};

/**
 * Unsubscribe from a specific event
 */
export const unsubscribeFromEvent = (event: string, callback?: (data: any) => void): void => {
  if (socket) {
    if (callback) {
      socket.off(event, callback);
    } else {
      socket.off(event);
    }
  }
};

/**
 * Emit an event to the server
 */
export const emitEvent = (event: string, data?: any): void => {
  if (socket?.connected) {
    socket.emit(event, data);
  } else {
    console.warn('Socket is not connected. Cannot emit event:', event);
  }
};

// Socket event types for type safety
export type SocketEvent =
  // Projects
  | 'project:created'
  | 'project:updated'
  | 'project:deleted'
  // Blogs
  | 'blog:created'
  | 'blog:updated'
  | 'blog:deleted'
  // Services
  | 'service:created'
  | 'service:updated'
  | 'service:deleted'
  // Skills
  | 'skill:created'
  | 'skill:updated'
  | 'skill:deleted'
  // Resume
  | 'resume:updated'
  | 'education:created'
  | 'education:updated'
  | 'education:deleted'
  | 'experience:created'
  | 'experience:updated'
  | 'experience:deleted'
  | 'achievement:created'
  | 'achievement:updated'
  | 'achievement:deleted'
  | 'reference:created'
  | 'reference:updated'
  | 'reference:deleted'
  // Testimonials
  | 'testimonial:created'
  | 'testimonial:updated'
  | 'testimonial:deleted'
  // FAQ
  | 'faq:created'
  | 'faq:updated'
  | 'faq:deleted'
  // About
  | 'about:updated'
  // Trash
  | 'trash:restored'
  | 'trash:permanently-deleted'
  | 'trash:cleaned'
  // System
  | 'maintenance:toggled';

export interface SocketNotification {
  event: SocketEvent;
  message: string;
  timestamp: string;
  data?: any;
  userId?: string;
}
