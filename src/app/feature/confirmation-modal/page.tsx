"use client";

import { useState, useEffect } from "react";
import { FiAlertCircle } from "react-icons/fi";
import GenericModal from "../../components/GenericModal";

interface ConfirmationModalProps {
  isOpen?: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

/**
 * Confirmation Modal Component
 *
 * A modal for confirming user actions with a simple yes/no interface.
 * Uses the GenericModal component for the modal structure.
 */
export default function ConfirmationModal({
  isOpen = false,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm = () => {},
  onCancel = () => {},
}: ConfirmationModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  // Update modal state when isOpen prop changes
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    onCancel();
  };

  const handleConfirm = () => {
    onConfirm();
    setIsModalOpen(false);
  };

  const modalTitle = (
    <div className="flex items-center">
      <FiAlertCircle
        className="w-5 h-5 text-pink-500 mr-2"
        suppressHydrationWarning
      />
      {title}
    </div>
  );

  const footerContent = (
    <div className="flex justify-end gap-3">
      <button
        onClick={closeModal}
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
  );

  return (
    <GenericModal
      isOpen={isModalOpen}
      onClose={closeModal}
      title={modalTitle}
      maxWidth="sm"
      dataModalType="confirmation-modal"
      footerContent={footerContent}
    >
      <p className="text-gray-700">{message}</p>
    </GenericModal>
  );
}
