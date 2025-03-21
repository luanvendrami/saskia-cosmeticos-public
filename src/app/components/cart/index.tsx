"use client";

import { useRef, useEffect, useState } from "react";
import { FiX, FiShoppingCart, FiTag } from "react-icons/fi";

import { useCart } from "../../context/CartContext";
import { CartService } from "../../services";
import { DeliveryInfo } from "../../interfaces/delivery";
import CartItem from "../cartItem/index";
import DeliveryModal from "../deliveryModal";

/**
 * Cart Component
 *
 * Displays added products, allows managing quantities
 * and finalizing the order via WhatsApp
 */
export default function Cart() {
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartItems, isCartOpen, toggleCart, cartTotal, cartCount } = useCart();

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

  return (
    <>
      {/* Cart button in header */}
      <button
        onClick={toggleCart}
        className="relative p-2 rounded-lg text-[#ff69b4] hover:bg-pink-100 transition-colors z-10"
        aria-label="Open cart"
      >
        <FiShoppingCart className="w-6 h-6" suppressHydrationWarning />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#ff69b4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                    className="mr-2 text-[#ff69b4]"
                    suppressHydrationWarning
                  />
                  Seu Carrinho
                  {cartCount > 0 && (
                    <span className="ml-2 bg-[#ff69b4] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
                      <CartItem key={`${item.id}-${index}`} item={item} />
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
                          onChange={(e) =>
                            setCodigoCupom(e.target.value.toUpperCase())
                          }
                          placeholder="Digite seu cupom"
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
                        Desconto aplicado com sucesso!
                      </p>
                    )}
                  </div>

                  {/* Summary */}
                  <div className="space-y-2 mb-4">
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

                    <div className="flex justify-between text-lg font-semibold">
                      <p>Total</p>
                      <p>R$ {totalComDesconto.toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <button
                    onClick={openCheckoutModal}
                    className="w-full bg-[#ff69b4] border border-transparent rounded-md py-3 px-4 font-medium text-white hover:bg-[#ff4dab] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                  >
                    Finalizar Compra via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <DeliveryModal
        isOpen={isCheckoutModalOpen}
        onClose={() => {
          console.log("Delivery modal closing, keeping cart open");
          // Just close the modal, don't affect cart state
          setIsCheckoutModalOpen(false);
        }}
        onCheckout={handleCheckout}
      />
    </>
  );
}
