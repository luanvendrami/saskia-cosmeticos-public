"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  FiX,
  FiShoppingCart,
  FiTag,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiAlertCircle,
} from "react-icons/fi";
import { createPortal } from "react-dom";

import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import { CartService } from "../../services";
import { DeliveryInfo } from "../../interfaces/delivery";
import { CartItem as CartItemType } from "../../interfaces/cart";
import DeliveryModal from "../../components/deliveryModal";

/**
 * Confirmation Modal Component
 */
interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

function ConfirmationModal({
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
            <FiAlertCircle
              className="w-5 h-5 text-pink-500 mr-2"
              suppressHydrationWarning
            />
            {title}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" suppressHydrationWarning />
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

/**
 * Cart Item Component
 */
interface CartItemComponentProps {
  item: CartItemType;
}

function CartItemComponent({ item }: CartItemComponentProps) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { mode } = useTheme();
  const { id, imageUrl, title, price, quantity } = item;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Parse price from string (R$ XX,XX) to number
  const getNumericPrice = (priceString: string | undefined | null): number => {
    if (!priceString || typeof priceString !== "string") return 0;
    return parseFloat(priceString.replace("R$ ", "").replace(",", "."));
  };

  const numericPrice = getNumericPrice(price);
  const totalPrice = numericPrice * quantity;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    removeFromCart(id);
  };

  return (
    <>
      <li className="py-4 px-4">
        <div className="flex items-start space-x-3">
          {/* Product Image */}
          <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
            {imageUrl && imageUrl.trim() !== "" ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                sizes="80px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-medium text-gray-800 truncate">
              {title}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              R$ {numericPrice.toFixed(2).replace(".", ",")}
            </p>

            {/* Quantity Controls */}
            <div className="mt-2 flex items-center">
              <button
                onClick={() => decreaseQuantity(id)}
                disabled={quantity <= 1}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Diminuir quantidade"
              >
                <FiMinus className="w-4 h-4" suppressHydrationWarning />
              </button>

              <span className="mx-2 w-8 text-center text-sm font-medium">
                {quantity}
              </span>

              <button
                onClick={() => increaseQuantity(id)}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                aria-label="Aumentar quantidade"
              >
                <FiPlus className="w-4 h-4" suppressHydrationWarning />
              </button>
            </div>
          </div>

          {/* Price and Remove Button */}
          <div className="flex flex-col items-end">
            <span className="text-base font-medium text-gray-900">
              R$ {totalPrice.toFixed(2).replace(".", ",")}
            </span>

            <button
              onClick={handleDelete}
              className="mt-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Remover item"
            >
              <FiTrash2 className="w-5 h-5" suppressHydrationWarning />
            </button>
          </div>
        </div>
      </li>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Remover produto"
        message={`Tem certeza que deseja remover "${title}" do carrinho?`}
        confirmText="Remover"
        cancelText="Cancelar"
      />
    </>
  );
}

/**
 * Cart Page
 *
 * Displays added products, allows managing quantities
 * and finalizing the order via WhatsApp
 */
export default function CartPage() {
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartItems, isCartOpen, toggleCart, cartTotal, cartCount } = useCart();
  const { mode } = useTheme();

  const [codigoCupom, setCodigoCupom] = useState("");
  const [erroCupom, setErroCupom] = useState("");
  const [descontoAplicado, setDescontoAplicado] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    /**
     * Handles click outside the cart to close it
     *
     * @param event - Mouse event
     */
    function handleOutsideClick(event: MouseEvent) {
      // If checkout modal is open, don't close cart at all
      if (isCheckoutModalOpen) {
        return;
      }

      // Check if clicked element or any of its parents is a modal
      const target = event.target as HTMLElement;

      // Check if clicking inside a confirmation modal
      const isInConfirmationModal = !!document
        .querySelector('[class*="z-[10000]"]')
        ?.contains(target);

      // Check if clicking inside the delivery modal using data attributes
      const isInDeliveryModal =
        !!target.closest('[data-modal-type="delivery-modal"]') ||
        !!target.closest(".MuiThemeProvider-root");

      // Don't close cart if clicking inside any modal
      if (isInConfirmationModal || isInDeliveryModal) {
        // If it's a modal click, don't close the cart
        return;
      }

      if (
        cartRef.current &&
        !cartRef.current.contains(target) &&
        isCartOpen &&
        // Additional check to make sure we're not in a modal
        !isInConfirmationModal &&
        !isInDeliveryModal
      ) {
        toggleCart();
      }
    }

    // Add event listener to document when cart is open
    if (isCartOpen) {
      document.addEventListener("mousedown", handleOutsideClick);

      // Prevent body scrolling when cart is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scrolling when cart is closed
      document.body.style.overflow = "";
    }

    // Remove listener when component is unmounted or cart closes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, toggleCart, isCheckoutModalOpen]);

  /**
   * Validates and applies discount coupon to cart
   */
  const aplicarCupom = () => {
    if (!codigoCupom) {
      setErroCupom("Por favor, insira um código de cupom.");
      return;
    }

    // List of valid coupons with their discount percentages
    const cuponsValidos: { [key: string]: number } = {
      PROMO10: 10,
    };

    // Verify if coupon is valid
    if (cuponsValidos[codigoCupom.toUpperCase()]) {
      const percentualDesconto = cuponsValidos[codigoCupom.toUpperCase()];
      const valorDesconto = cartTotal * (percentualDesconto / 100);

      setDescontoAplicado(valorDesconto);
      setErroCupom("");
    } else {
      setErroCupom("Cupom inválido ou expirado.");
    }
  };

  /**
   * Opens the checkout modal
   */
  const openCheckoutModal = () => {
    if (cartItems.length === 0) return;
    setIsCheckoutModalOpen(true);
  };

  /**
   * Handles checkout with delivery information
   */
  const handleCheckout = (deliveryInfo: DeliveryInfo) => {
    if (cartItems.length === 0) return;

    // Use CartService to handle checkout with delivery info
    CartService.checkoutViaWhatsApp(
      cartItems,
      cartTotal,
      descontoAplicado,
      deliveryInfo
    );

    // Close the checkout modal only, keep the cart open
    setIsCheckoutModalOpen(false);

    // We don't close the cart here anymore, allowing the user to continue shopping
  };

  // Calculate total after discount
  const totalComDesconto = cartTotal - descontoAplicado;

  const closeDeliveryModal = () => {
    setIsCheckoutModalOpen(false);
    // Keep cart open without logging
  };

  return (
    <>
      {/* Cart button in header */}
      <button
        onClick={toggleCart}
        className="relative p-2 rounded-lg text-[var(--primary-color)] hover:bg-[var(--secondary-light)] transition-colors z-10"
        aria-label="Open cart"
      >
        <FiShoppingCart className="w-6 h-6" suppressHydrationWarning />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[var(--primary-color)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart modal - only shows when open */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Darkened background */}
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity"
            onClick={toggleCart}
          />

          {/* Cart */}
          <div
            ref={cartRef}
            className="relative w-full max-w-md bg-white h-full shadow-xl overflow-hidden transform transition-transform animate-slide-in-right"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-pink-50 to-white">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <FiShoppingCart
                    className="mr-2 text-[var(--primary-color)]"
                    suppressHydrationWarning
                  />
                  Seu Carrinho
                  {cartCount > 0 && (
                    <span className="ml-2 bg-[var(--primary-color)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </h2>
                <button
                  onClick={toggleCart}
                  className="rounded-md bg-white p-2 hover:bg-gray-100 transition-colors"
                >
                  <FiX
                    className="w-5 h-5 text-gray-500"
                    suppressHydrationWarning
                  />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto divide-y divide-gray-200">
                {cartItems.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map((item, index) => (
                      <CartItemComponent
                        key={`${item.id}-${index}`}
                        item={item}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <div className="w-24 h-24 rounded-full bg-pink-50 flex items-center justify-center mb-4">
                      <FiShoppingCart
                        className="w-12 h-12 text-[#ff69b4]"
                        suppressHydrationWarning
                      />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      Seu carrinho está vazio
                    </h3>
                    <p className="text-gray-500 max-w-xs">
                      Adicione produtos ao seu carrinho para continuar com a
                      compra.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer with total and checkout */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-4 bg-gradient-to-r from-white to-pink-50">
                  {/* Coupon */}
                  <div className="mb-4">
                    <div className="flex gap-2 items-center">
                      <div className="flex-1">
                        <label
                          htmlFor="cupom"
                          className="block text-sm font-medium text-gray-700 mb-1 flex items-center"
                        >
                          <FiTag
                            className="mr-1 text-[#ff69b4]"
                            suppressHydrationWarning
                          />{" "}
                          Cupom de desconto
                        </label>
                        <input
                          type="text"
                          id="cupom"
                          value={codigoCupom}
                          onChange={(e) => setCodigoCupom(e.target.value)}
                          placeholder="Insira o código"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-300 focus:ring focus:ring-pink-200 focus:ring-opacity-50 text-sm"
                        />
                      </div>
                      <button
                        onClick={aplicarCupom}
                        className="px-4 py-2 bg-pink-100 text-[#ff69b4] rounded-md hover:bg-pink-200 transition-colors mt-6 text-sm font-medium"
                      >
                        Aplicar
                      </button>
                    </div>
                    {erroCupom && (
                      <p className="mt-1 text-xs text-red-500">{erroCupom}</p>
                    )}
                    {descontoAplicado > 0 && (
                      <p className="mt-1 text-xs text-green-600">
                        Cupom aplicado com sucesso!
                      </p>
                    )}
                  </div>

                  {/* Total and subtotal */}
                  <div className="mt-6 space-y-4">
                    <div className="flex justify-between text-base text-gray-900">
                      <p>Subtotal</p>
                      <p>R$ {cartTotal.toFixed(2).replace(".", ",")}</p>
                    </div>
                    {descontoAplicado > 0 && (
                      <div className="flex justify-between text-base text-green-600">
                        <p>Desconto</p>
                        <p>
                          -R$ {descontoAplicado.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <p>Total</p>
                      <p>R$ {totalComDesconto.toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>

                  {/* Continue to checkout button */}
                  <div className="mt-6">
                    <button
                      onClick={openCheckoutModal}
                      className="w-full bg-[var(--primary-color)] border border-transparent rounded-md py-3 px-4 font-medium text-white hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                    >
                      Finalizar Compra via WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <DeliveryModal
        isOpen={isCheckoutModalOpen}
        onClose={closeDeliveryModal}
        onCheckout={handleCheckout}
      />
    </>
  );
}
