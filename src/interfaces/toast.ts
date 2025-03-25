

import { ReactNode } from 'react';


export type ToastType = 'success' | 'error' | 'info' | 'warning';


export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  showCartIcon?: boolean;
}


export interface ToastContextProps {
  showToast: (message: string, type?: ToastType, duration?: number, showCartIcon?: boolean) => void;
}

export interface ToastProps {
  isVisible: boolean;       
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;           
  duration?: number;         
  onClose?: () => void;     
  icon?: ReactNode;         
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'; 
} 