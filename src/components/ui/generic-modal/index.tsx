"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";


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

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);


  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;

      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
    } else {
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
    }

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

  if (!mounted || !isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!preventBackdropClose) {
      onClose();
    }
  };

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

      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleBackdropClick}
        onMouseDown={(e) => e.stopPropagation()}
        data-modal-backdrop="true"
      />
      <div
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses} overflow-hidden transform ${
          disableAnimation ? "" : "animate-modal-slide-up"
        } max-h-[90vh] overflow-y-auto modal-content-mobile ${className}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        data-modal-content="true"
      >
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

        <div className="p-6">{children}</div>
        {footerContent && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
