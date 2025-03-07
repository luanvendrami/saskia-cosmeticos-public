"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FiShoppingCart, FiEye } from "react-icons/fi";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  description: string;
  price?: string;
  category?: string;
  hideViewAll?: boolean;
  onAddToCart?: (e: React.MouseEvent) => void;
}

export default function ProductModal({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  price,
  category,
  hideViewAll = false,
  onAddToCart,
}: ProductModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Map category display names to URL paths
  const getCategoryPath = (category?: string) => {
    if (!category) return "";
    
    const categoryMap: {[key: string]: string} = {
      "Cabelos": "cabelos",
      "Skin Care": "skincare",
      "Maquiagem": "maquiagem",
      "Perfumes": "perfumes",
      "Corpo": "corpo"
    };
    
    return categoryMap[category] || category.toLowerCase();
  };

  if (!isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 animate-modal-slide-up max-h-[90vh] overflow-auto">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-[10000] rounded-full bg-white p-2 shadow-md hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Image */}
          <div className="relative w-full h-[400px]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>

          {/* Content */}
          <div className="p-6 bg-gradient-to-b from-white to-gray-50">
            {category && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-[#ff69b4] bg-pink-50 rounded-full mb-3">
                {category}
              </span>
            )}
            
            <h3 className="text-2xl font-semibold text-gray-800 tracking-tight">
              {title}
            </h3>

            <div className="mt-4">
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            {price && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-2xl font-bold text-[#ff69b4]">{price}</p>
                <span className="text-sm text-gray-500 uppercase tracking-wider">
                  Em estoque
                </span>
              </div>
            )}

            <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2">
              {/* Add to Cart Button */}
              {price && onAddToCart && (
                <button
                  onClick={onAddToCart}
                  className="w-full py-3 bg-pink-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  Adicionar ao Carrinho
                </button>
              )}

              {/* View All Products Button */}
              {category && !hideViewAll && (
                <Link
                  href={`/${getCategoryPath(category)}`}
                  className="w-full py-3 bg-white border border-pink-500 text-pink-500 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-50 transition-colors"
                  onClick={onClose}
                >
                  <FiEye className="w-5 h-5" />
                  Ver Todos {category}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body) 
    : null;
} 