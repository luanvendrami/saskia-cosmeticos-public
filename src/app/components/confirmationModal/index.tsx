"use client";

import { useState, useEffect } from "react";
import { FiAlertCircle, FiX } from "react-icons/fi";
import { createPortal } from "react-dom";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmationModalProps) {
  const [mounted, setMounted] = useState(false);

  // Handle mounting for client-side rendering
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Don't render on server or if modal is not open
  if (!mounted || !isOpen) return null;

  // Prevent events from bubbling up to parent components
  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Function to handle confirmation
  const handleConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    onConfirm();
    onClose();
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
      onClick={handleModalClick}
      onMouseDown={handleModalClick}
    >
      {/* Animation styles */}
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
      `}</style>

      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onMouseDown={(e) => e.stopPropagation()}
      />

      {/* Modal */}
      <div
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md animate-modal-slide-up"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <FiAlertCircle className="w-5 h-5 text-pink-500 mr-2" />
            {title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-gray-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  return createPortal(modalContent, document.body);
}
