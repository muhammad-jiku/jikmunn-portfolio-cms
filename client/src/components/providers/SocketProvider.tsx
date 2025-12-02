/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import {
  disconnectSocket,
  initializeSocket,
  SocketEvent,
  SocketNotification,
  subscribeToEvent,
} from '@/lib/socket';
import { toast } from '@/lib/toast';
import { RootState } from '@/store';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface SocketContextType {
  isConnected: boolean;
  notifications: SocketNotification[];
  clearNotifications: () => void;
}

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  notifications: [],
  clearNotifications: () => {},
});

export const useSocket = () => useContext(SocketContext);

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [notifications, setNotifications] = useState<SocketNotification[]>([]);
  const { idToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!idToken) {
      disconnectSocket();
      setIsConnected(false);
      return;
    }

    // Initialize socket connection
    const socket = initializeSocket(idToken);

    const handleConnect = () => {
      setIsConnected(true);
      console.log('Socket connected');
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    };

    // Listen to connection events
    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    // Set initial connection state
    if (socket.connected) {
      setIsConnected(true);
    }

    // Subscribe to all event types
    const events: SocketEvent[] = [
      'project:created',
      'project:updated',
      'project:deleted',
      'blog:created',
      'blog:updated',
      'blog:deleted',
      'service:created',
      'service:updated',
      'service:deleted',
      'skill:created',
      'skill:updated',
      'skill:deleted',
      'resume:updated',
      'education:created',
      'education:updated',
      'education:deleted',
      'experience:created',
      'experience:updated',
      'experience:deleted',
      'achievement:created',
      'achievement:updated',
      'achievement:deleted',
      'reference:created',
      'reference:updated',
      'reference:deleted',
      'testimonial:created',
      'testimonial:updated',
      'testimonial:deleted',
      'faq:created',
      'faq:updated',
      'faq:deleted',
      'about:updated',
      'trash:restored',
      'trash:permanently-deleted',
      'trash:cleaned',
      'maintenance:toggled',
    ];

    const handleNotification = (event: SocketEvent) => (data: any) => {
      const notification: SocketNotification = {
        event,
        message: data.message || 'New update',
        timestamp: data.timestamp || new Date().toISOString(),
        data: data.data,
        userId: data.userId,
      };

      setNotifications((prev) => [notification, ...prev].slice(0, 50)); // Keep last 50

      // Show toast notification
      if (event.includes('created')) {
        toast.success(notification.message);
      } else if (event.includes('updated')) {
        toast.info(notification.message);
      } else if (event.includes('deleted')) {
        toast.error(notification.message);
      } else if (event.includes('restored')) {
        toast.success(notification.message);
      } else {
        toast.info(notification.message);
      }
    };

    // Subscribe to all events
    events.forEach((event) => {
      subscribeToEvent(event, handleNotification(event));
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      disconnectSocket();
    };
  }, [idToken]);

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        notifications,
        clearNotifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
