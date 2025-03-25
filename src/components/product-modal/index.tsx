"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, TouchEvent } from "react";
import { createPortal } from "react-dom";
import { FaWhatsapp, FaThumbsUp } from "react-icons/fa";
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

import { ProductModalProps } from "../../interfaces/modal";
import { ProductService, WhatsAppService } from "../../services";


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
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const imageArray =
    images && images.length > 0 ? images : imageUrl ? [imageUrl] : [];
  const handleTouchStart = (e: TouchEvent) => {
    setTouchEnd(null); 
    setTouchStart(e.targetTouches[0].clientX);
  };


  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };


  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && imageArray.length > 1) {
      if (currentImageIndex < imageArray.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else {
        setCurrentImageIndex(0);
      }
    }

    if (isRightSwipe && imageArray.length > 1) {

      if (currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      } else {
        setCurrentImageIndex(imageArray.length - 1);
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };


  const navigateToPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageArray.length - 1 : prev - 1
    );
  };

  const navigateToNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentImageIndex < imageArray.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      setCurrentImageIndex(0);
    }
  };

  useEffect(() => {
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

  const categoryPath = category ? ProductService.getCategoryPath(category) : "";

  const precoComDesconto = price
    ? ProductService.calculateDiscountedPrice(
        price,
        promocao || false,
        descontoPromocao
      )
    : null;
  const handleAddToCart = (e: React.MouseEvent) => {
    if (onAddToCart) {
      onAddToCart(e);
    }

    if (showAddedNotification) {
      setIsExiting(true);
      setTimeout(() => {
        setIsExiting(false);
        setShowAddedNotification(true);
      }, 300);
    } else {
      setShowAddedNotification(true);
    }

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
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl mx-4 animate-modal-slide-up max-h-[90vh] md:max-h-[85vh] overflow-auto">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
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

          {showAddedNotification && (
            <div className="absolute top-4 inset-x-0 flex justify-center z-[10001]">
              <div
                className={`px-1 w-full max-w-sm ${
                  isExiting ? "animate-slide-out-top" : "animate-slide-in-top"
                }`}
              >
                <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-md overflow-hidden">
                  <div className="pl-4 flex items-center justify-center">
                    <div className="animate-pulse">
                      <FaThumbsUp className="text-pink-500 w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex-1 px-4 py-2.5">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium text-pink-500">{title}</span>{" "}
                      adicionado ao carrinho
                    </p>
                  </div>

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

            {imageArray.length > 1 && (
              <>
                <button
                  onClick={navigateToPrevImage}
                  className="hidden md:block absolute left-2 top-1/2 -translate-y-1/2 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] p-3 rounded-full shadow-md transition-colors z-10"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={navigateToNextImage}
                  className="hidden md:block absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] p-3 rounded-full shadow-md transition-colors z-10"
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
                          ? "bg-[var(--primary-color)] w-3"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {stockQuantity === 0 && (
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center">
                <div className="bg-red-500 text-white px-8 py-3 rounded-sm font-bold tracking-wider text-xl transform -rotate-12 shadow-lg mb-4">
                  ESGOTADO
                </div>
              </div>
            )}
          </div>

          <div className="p-2 sm:p-6 bg-gradient-to-b from-[var(--background-light)] to-[var(--background-dark)]">
            {category && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-[var(--primary-color)] bg-[var(--primary-light)] rounded-full mb-2 sm:mb-3">
                {category}
              </span>
            )}

            <h3 className="text-lg sm:text-2xl font-semibold text-[var(--text-primary)] tracking-tight">
              {title}
            </h3>

            <div className="mt-2 sm:mt-4">
              <p className="text-xs sm:text-base text-[var(--text-secondary)] leading-relaxed line-clamp-2 sm:line-clamp-none">
                {description}
              </p>
            </div>

            {price && (
              <div className="mt-2 sm:mt-6">
                <div className="flex items-center mb-1 sm:mb-4">
                  <p className="text-base sm:text-xl text-[var(--text-secondary)] line-through">
                    {price}
                  </p>
                  {promocao && (
                    <span className="ml-3 bg-[var(--primary-color)] text-white text-xs sm:text-sm px-2 py-0.5 rounded font-medium">
                      -{descontoPromocao || 10}%
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-[var(--success-color)]">
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
                      <span className="text-[var(--primary-color)] uppercase text-xs sm:text-sm font-medium flex items-center">
                        <FiAlertCircle className="mr-1 text-[var(--primary-color)]" />{" "}
                        Poucas unidades
                      </span>
                    ) : (
                      <div className="bg-green-100 px-2 sm:px-3 py-1 rounded-md">
                        <span className="text-xs sm:text-sm text-green-800 font-medium">
                          Em Estoque
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 sm:mt-6 grid gap-2 sm:gap-4 grid-cols-1">

              {price && onAddToCart && (
                <>
                  {stockQuantity === 0 ? (
                    <button
                      className="w-full mb-2 py-3 px-4 rounded-full bg-[var(--background-light)] border-2 border-gray-300 text-[var(--text-primary)] text-sm sm:text-base hover:bg-[var(--background-dark)] transition-colors shadow-sm flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        WhatsAppService.sendStockNotification(title);
                      }}
                    >
                      <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      <span>Avise-me quando disponível</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className={`w-full py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 ${
                        (stockQuantity ?? 0) > 0
                          ? "bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    >
                      <FiShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Adicionar ao Carrinho</span>
                    </button>
                  )}
                </>
              )}

              {category && !hideViewAll && (
                <Link
                  href={`/${categoryPath}`}
                  className="w-full py-3 px-4 bg-[var(--background-light)] border border-[var(--primary-color)] text-[var(--primary-color)] rounded-full flex items-center justify-center gap-2 text-sm sm:text-base hover:bg-[var(--primary-light)] transition-colors"
                  onClick={onClose}
                >
                  <FiEye className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Ver Todos {category}</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
