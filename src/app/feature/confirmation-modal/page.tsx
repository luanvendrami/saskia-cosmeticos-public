"use client";

import { useState } from "react";
import ConfirmationModal from "@/app/components/confirmation-modal";

export default function ConfirmationModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setIsOpen(false);
  };

  const handleCancel = () => {
    console.log("Cancelled!");
    setIsOpen(false);
  };

  const handleDeleteClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleDeleteClick}
        className="p-2 text-gray-500 hover:text-red-500"
        aria-label="Delete item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>

      <ConfirmationModal
        isOpen={isOpen}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
