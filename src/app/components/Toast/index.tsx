"use client";

import { useEffect, useState } from "react";
import { FiCheck, FiShoppingCart, FiX, FiInfo, FiAlertTriangle } from "react-icons/fi";
import { createPortal } from "react-dom";
import { ToastProps } from "../../interfaces/toast";

export default function Toast({ 
  message, 
  type = 'success', 
  duration = 3000, 
  onClose,
  isVisible = true,
  icon,
  position = 'bottom-center',
  showCartIcon = false 
}: ToastProps & { showCartIcon?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const [isShowing, setIsShowing] = useState(isVisible);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set a timer to close the toast after duration
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsShowing(false);
        setTimeout(() => {
          if (onClose) onClose();
        }, 500); // Wait for exit animation to complete
      }, 500); // Animation duration
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  // Determine icon based on toast type
  const getIcon = () => {
    if (icon) return icon;
    if (showCartIcon) return <FiShoppingCart className="text-white text-lg" />;
    
    switch (type) {
      case 'success':
        return <FiCheck className="text-white text-lg" />;
      case 'error':
        return <FiX className="text-white text-lg" />;
      case 'info':
        return <FiInfo className="text-white text-lg" />;
      case 'warning':
        return <FiAlertTriangle className="text-white text-lg" />;
      default:
        return <FiCheck className="text-white text-lg" />;
    }
  };

  // Determine background color based on toast type
  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'error':
        return 'bg-gradient-to-r from-red-500 to-red-600';
      case 'info':
        return 'bg-gradient-to-r from-blue-500 to-blue-600';
      case 'warning':
        return 'bg-gradient-to-r from-amber-500 to-amber-600';
      default:
        return 'bg-gradient-to-r from-green-500 to-green-600';
    }
  };

  // Get position class
  const getPositionClass = () => {
    switch (position) {
      case 'top-right':
        return 'top-8 right-8 transform-none';
      case 'top-left':
        return 'top-8 left-8 transform-none';
      case 'bottom-right':
        return 'bottom-8 right-8 transform-none';
      case 'bottom-left':
        return 'bottom-8 left-8 transform-none';
      case 'top-center':
        return 'top-8 left-1/2 transform -translate-x-1/2';
      case 'bottom-center':
      default:
        return 'bottom-8 left-1/2 transform -translate-x-1/2';
    }
  };

  // Custom animation for cart toast
  const getAnimation = () => {
    if (showCartIcon) {
      if (isExiting) return 'animate-bounce-out';
      return 'animate-bounce-in';
    }
    return '';
  };

  // Don't render anything on the server or if not visible
  if (!mounted || !isShowing) return null;

  const toastContent = (
    <div 
      className={`fixed ${getPositionClass()} z-[10000] flex items-center p-4 mb-4 
                  rounded-lg shadow-xl ${getBgColor()} text-white 
                  ${getAnimation()} transition-all duration-300 ${isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
      style={{ 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        minWidth: '300px',
        maxWidth: '90%'
      }}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-white/20 mr-3">
        {getIcon()}
      </div>
      <div className="ml-2 text-base font-medium">{message}</div>
      <button 
        type="button" 
        className="ml-auto -mx-1.5 -my-1.5 rounded-full p-1.5 inline-flex items-center justify-center h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => {
            setIsShowing(false);
            setTimeout(() => {
              if (onClose) onClose();
            }, 500);
          }, 500);
        }}
      >
        <FiX />
      </button>
    </div>
  );

  return createPortal(toastContent, document.body);
} 