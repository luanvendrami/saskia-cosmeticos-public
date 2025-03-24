/**
 * @fileoverview Toast notification related interfaces for the application
 */

import { ReactNode } from 'react';

/**
 * Type definition for toast notification types
 */
export type ToastType = 'success' | 'error' | 'info' | 'warning';

/**
 * Interface for toast message object
 */
export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  showCartIcon?: boolean;
}

/**
 * Interface for toast context properties
 */
export interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number, showCartIcon?: boolean) => void;
}

/**
 * Interface for toast component properties
 */
export interface ToastProps {
  isVisible: boolean;        // Controls toast visibility
  type: 'success' | 'error' | 'info' | 'warning'; // Toast type for styling
  message: string;           // Toast message text
  duration?: number;         // Duration in milliseconds before auto-hiding
  onClose?: () => void;      // Function called when toast is closed
  icon?: ReactNode;          // Optional custom icon
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'; // Toast position
} 