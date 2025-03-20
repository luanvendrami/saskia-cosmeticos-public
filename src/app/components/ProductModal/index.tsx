"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, TouchEvent } from "react";
import { createPortal } from "react-dom";
import {
  FiShoppingCart,
  FiEye,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { FaWhatsapp, FaThumbsUp } from "react-icons/fa";
import { ProductModalProps } from "../../interfaces/modal";
import { ProductService, WhatsAppService } from "../../services";

/**
 * Componente que exibe um modal detalhado de produto
 * Permite visualizar mais informações e adicionar ao carrinho
 *
 * @param isOpen - Indica se o modal está aberto
 * @param onClose - Função para fechar o modal
 * @param imageUrl - URL da imagem do produto
 * @param images - Array de URLs das imagens do produto
 * @param title - Título do produto
 * @param description - Descrição do produto
 * @param price - Preço do produto
 * @param category - Categoria do produto
 * @param hideViewAll - Indica se deve ocultar a opção "Ver Todos"
 * @param onAddToCart - Função para adicionar ao carrinho
 * @param stockQuantity - Quantidade em estoque
 * @param promocao - Indica se o produto está em promoção
 * @param descontoPromocao - Porcentagem de desconto aplicada na promoção
 * @param cupom - Código do cupom de desconto
 */
export default function ModalProduto({
  isOpen,
  onClose,
  imageUrl,
  images,
  title,
  description,
  price,
  category,
  hideViewAll = false,
  onAddToCart,
  stockQuantity,
  promocao,
  descontoPromocao,
  cupom,
}: ProductModalProps) {
  // State for the in-modal notification
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Touch handling state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Create an array of images from the props
  const imageArray =
    images && images.length > 0 ? images : imageUrl ? [imageUrl] : [];

  console.log("ProductModal - Images:", {
    images,
    imageUrl,
    imageArray,
    imageArrayLength: imageArray.length,
  });

  // Handle touch start
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && imageArray.length > 1) {
      // Swipe left - go to next image
      if (currentImageIndex < imageArray.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
    }

    if (isRightSwipe && imageArray.length > 1) {
      // Swipe right - go to previous image
      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else {
        setCurrentImageIndex(imageArray.length - 1);
      }
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Navigate to the previous image
  const navigateToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Navigating to previous image", {
      currentIndex: currentImageIndex,
      arrayLength: imageArray.length,
    });
    // Simplify logic to test
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    } else {
      setCurrentImageIndex(imageArray.length - 1);
    }
  };

  // Navigate to the next image
  const navigateToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Simplify logic to test
    if (currentImageIndex < imageArray.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  useEffect(() => {
    /**
     * Trata o evento de pressionar a tecla ESC para fechar o modal
     *
     * @param e - Evento de teclado
     */
    const tratarTeclaEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", tratarTeclaEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", tratarTeclaEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Get the category path using the ProductService
  const categoryPath = category ? ProductService.getCategoryPath(category) : "";

  // Get the discounted price using the ProductService
  const precoComDesconto = price
    ? ProductService.calculateDiscountedPrice(
        price,
        promocao || false,
        descontoPromocao
      )
    : null;

  /**
   * Handler para adicionar o produto ao carrinho e exibir uma notificação dentro do modal
   *
   * @param e - Evento de clique
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    // Call the original onAddToCart function if provided
    if (onAddToCart) {
      onAddToCart(e);
    }

    // If notification is already showing, reset it for a fresh animation
    if (showAddedNotification) {
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setShowAddedNotification(true);
      }, 300);
    } else {
      // Show the in-modal notification
      setShowAddedNotification(true);
    }

    // Hide the notification after 3 seconds
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowAddedNotification(false);
        setIsExiting(false);
      }, 400);
    }, 3000);
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
      <div className="relative w-full max-w-2xl mx-4 animate-modal-slide-up max-h-[90vh] md:max-h-[85vh] overflow-auto">
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

          {/* In-modal notification for cart add */}
          {showAddedNotification && (
            <div className="absolute top-4 inset-x-0 flex justify-center z-[10001]">
              <div
                className={`px-1 w-full max-w-sm ${
                  isExiting ? "animate-slide-out-top" : "animate-slide-in-top"
                }`}
              >
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-md overflow-hidden">
                  {/* Success icon */}
                  <div className="pl-4 flex items-center justify-center">
                    <div className="animate-pulse">
                      <FaThumbsUp className="text-pink-500 w-5 h-5" />
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex-1 px-4 py-2.5">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-pink-500">{title}</span>{" "}
                      adicionado ao carrinho
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => {
                      setIsExiting(true);
                      setTimeout(() => {
                        setShowAddedNotification(false);
                        setIsExiting(false);
                      }, 400);
                    }}
                    className="pr-4 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Image */}
          <div
            className="relative w-full flex justify-center items-center overflow-hidden bg-gray-50 p-2"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="w-full flex justify-center items-center"
              style={{ aspectRatio: "1/1", maxHeight: "280px" }}
            >
              {imageArray.length > 0 && (
                <Image
                  src={imageArray[currentImageIndex]}
                  alt={title}
                  width={500}
                  height={500}
                  className={`w-auto h-auto max-w-full max-h-[200px] sm:max-h-[280px] object-contain ${
                    stockQuantity === 0 ? "grayscale" : ""
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1024px"
                  priority
                />
              )}
            </div>

            {/* Image navigation controls - visible only on desktop */}
            {imageArray.length > 1 && (
              <>
                <button
                  onClick={navigateToPrevImage}
                  className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-md transition-colors z-10"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={navigateToNextImage}
                  className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 p-3 rounded-full shadow-md transition-colors z-10"
                  aria-label="Next image"
                >
                  <FiChevronRight className="w-6 h-6 text-white" />
                </button>
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1.5">
                  <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs">
                    {currentImageIndex + 1} / {imageArray.length}
                  </div>
                </div>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                  {imageArray.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-[#ff69b4] w-3"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Out of Stock Overlay */}
            {stockQuantity === 0 && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <div className="bg-red-500 text-white px-8 py-3 rounded-sm font-bold tracking-wider text-xl transform -rotate-12 shadow-lg mb-4">
                  ESGOTADO
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-2 sm:p-6 bg-gradient-to-b from-white to-gray-50">
            {category && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-[#ff69b4] bg-pink-50 rounded-full mb-2 sm:mb-3">
                {category}
              </span>
            )}

            <h3 className="text-lg sm:text-2xl font-semibold text-gray-800 tracking-tight">
              {title}
            </h3>

            <div className="mt-2 sm:mt-4">
              <p className="text-xs sm:text-base text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                {description}
              </p>
            </div>

            {price && (
              <div className="mt-2 sm:mt-6">
                {/* Preço e desconto */}
                <div className="flex items-center mb-1 sm:mb-4">
                  <p className="text-base sm:text-xl text-gray-500 line-through">
                    {price}
                  </p>
                  {promocao && (
                    <span className="ml-3 bg-[#ff69b4] text-white text-xs sm:text-sm px-2 py-0.5 rounded font-medium">
                      -{descontoPromocao || 10}%
                    </span>
                  )}
                </div>

                {/* Preço final */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    {promocao && precoComDesconto
                      ? `R$ ${precoComDesconto}`
                      : price}
                  </span>
                  {promocao && cupom && (
                    <div className="bg-green-100 px-2 sm:px-3 py-1 rounded-md">
                      <span className="text-xs sm:text-sm text-green-800 font-medium">
                        Cupom: {cupom}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stock Status - Component now supplies icons and styling */}
                {typeof stockQuantity === "number" && (
                  <div className="flex justify-between items-center mt-1">
                    {stockQuantity <= 0 ? (
                      <span className="text-red-500 uppercase text-xs sm:text-sm font-medium flex items-center">
                        <FiXCircle className="mr-1 text-red-500" /> Esgotado
                      </span>
                    ) : stockQuantity <= 3 ? (
                      <span className="text-orange-500 uppercase text-xs sm:text-sm font-medium flex items-center">
                        <FiAlertCircle className="mr-1 text-orange-500" />
                        Apenas {stockQuantity}{" "}
                        {stockQuantity === 1 ? "unidade" : "unidades"}!
                      </span>
                    ) : stockQuantity <= 5 ? (
                      <span className="text-orange-400 uppercase text-xs sm:text-sm font-medium flex items-center">
                        <FiAlertCircle className="mr-1 text-orange-400" />{" "}
                        Últimas unidades!
                      </span>
                    ) : stockQuantity <= 10 ? (
                      <span className="text-[#ff69b4] uppercase text-xs sm:text-sm font-medium flex items-center">
                        <FiAlertCircle className="mr-1 text-[#ff69b4]" /> Poucas
                        unidades
                      </span>
                    ) : (
                      <span className="text-green-600 uppercase text-xs sm:text-sm font-medium flex items-center">
                        <FiCheckCircle className="mr-1 text-green-600" /> Em
                        estoque
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-2 sm:mt-6 grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {/* Add to Cart Button - Disable if out of stock */}
              {price && onAddToCart && (
                <>
                  {stockQuantity === 0 ? (
                    <button
                      className="w-full py-2 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 bg-white border-2 border-gray-300 text-gray-700 text-xs sm:text-base hover:bg-gray-50 transition-colors shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        WhatsAppService.sendStockNotification(title);
                      }}
                    >
                      <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      Avise-me quando disponível
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-2 sm:py-3 bg-pink-500 text-white rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base hover:bg-pink-600 transition-colors"
                    >
                      <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      Adicionar ao Carrinho
                    </button>
                  )}
                </>
              )}

              {/* View All Products Button */}
              {category && !hideViewAll && (
                <Link
                  href={`/${categoryPath}`}
                  className="w-full py-2 sm:py-3 bg-white border border-pink-500 text-pink-500 rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base hover:bg-pink-50 transition-colors"
                  onClick={onClose}
                >
                  <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
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
  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
