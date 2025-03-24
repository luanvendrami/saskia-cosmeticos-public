"use client";

import { useEffect, useState, ReactNode } from "react";
import { FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

/**
 * GenericModal component props
 */
export interface GenericModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string | ReactNode;
  children: ReactNode;
  maxWidth?: string;
  showCloseButton?: boolean;
  dataModalType?: string;
  preventBackdropClose?: boolean;
  className?: string;
  footerContent?: ReactNode;
  disableAnimation?: boolean;
}

/**
 * Generic Modal Component
 *
 * A reusable modal component that can be used for different types of modals.
 * Handles open/close animation, backdrop click, and portal rendering.
 */
export default function GenericModal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "md",
  showCloseButton = true,
  dataModalType = "generic-modal",
  preventBackdropClose = false,
  className = "",
  footerContent,
  disableAnimation = false,
}: GenericModalProps) {
  const [mounted, setMounted] = useState(false);

  // Handle mounting for client-side rendering
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Control body scroll when modal state changes
  useEffect(() => {
    if (isOpen) {
      // Save the current scroll position
      const scrollY = window.scrollY;

      // Prevent background scrolling when modal is open
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling and scroll position
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      // Restore the scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }

    // Cleanup function to ensure scroll is restored if component unmounts while modal is open
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    };
  }, [isOpen]);

  // Don't render on server or if modal is not open
  if (!mounted || !isOpen) return null;

  // Prevent events from bubbling up to parent components
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!preventBackdropClose) {
      onClose();
    }
  };

  // Size classes based on maxWidth
  const sizeClasses =
    {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      full: "max-w-full",
    }[maxWidth] || "max-w-md";

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={handleModalClick}
      onMouseDown={handleModalClick}
      data-modal-type={dataModalType}
    >
      {/* Animation styles */}
      {!disableAnimation && (
        <style jsx global>{`
          @keyframes modal-slide-up {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-modal-slide-up {
            animation: modal-slide-up 0.3s ease-out forwards;
          }

          @media (max-width: 640px) {
            .modal-content-mobile {
              margin: 0 8px;
              max-width: calc(100% - 16px) !important;
              max-height: 95vh !important;
            }
          }
        `}</style>
      )}

      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        onMouseDown={(e) => e.stopPropagation()}
        data-modal-backdrop="true"
      />

      {/* Modal */}
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses} overflow-hidden transform ${
          disableAnimation ? "" : "animate-modal-slide-up"
        } max-h-[90vh] overflow-y-auto modal-content-mobile ${className}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        data-modal-content="true"
      >
        {/* Header - only show if title or close button is enabled */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {title && (
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <FiX
                  className="w-5 h-5 text-gray-500"
                  suppressHydrationWarning
                />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">{children}</div>

        {/* Footer - only show if footerContent is provided */}
        {footerContent && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
}
