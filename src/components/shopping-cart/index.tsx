"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import {
  FiX,
  FiShoppingCart,
  FiTag,
  FiTrash2,
  FiMinus,
  FiPlus,
  FiAlertCircle,
} from "react-icons/fi";

import ConfirmationModal from "@/components/confirmation-modal";
import DeliveryModalPage from "@/components/delivery-modal";
import { useCart } from "@/context/cartContext";

import { CartItem as CartItemType } from "@/interfaces/cart";
import { CartService } from "@/services";
import { DeliveryInfo } from "@/services/delivery";

interface CartItemComponentProps {
  item: CartItemType;
}

function CartItemComponent({ item }: CartItemComponentProps) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { id, imageUrl, title, price, quantity } = item;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
          <div className="flex-1 min-w-0">
            <h4 className="text-base font-medium text-gray-800 truncate">
              {title}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              R$ {numericPrice.toFixed(2).replace(".", ",")}
            </p>

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

      <ConfirmationModal
        isOpen={showDeleteModal}
        title="Remover produto"
        message={`Tem certeza que deseja remover "${title}" do carrinho?`}
        confirmText="Remover"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
}

export default function ShoppingCart() {
  const cartRef = useRef<HTMLDivElement>(null);
  const { cartItems, isCartOpen, toggleCart, cartTotal, cartCount } = useCart();

  const [codigoCupom, setCodigoCupom] = useState("");
  const [erroCupom, setErroCupom] = useState("");
  const [descontoAplicado, setDescontoAplicado] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  useEffect(() => {
    if (!isCartOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as HTMLElement;

      const isCloseButton =
        target.closest('[aria-label="Close"]') ||
        target.closest('[aria-label="Fechar"]') ||
        target.closest(".MuiIconButton-root");

      if (isCloseButton) {
        return;
      }

      const isInConfirmationModal =
        target.closest('[role="dialog"]') ||
        target.closest('[class*="z-[10000]"]');

      const isInDeliveryModal =
        target.closest('[data-modal-type="delivery-modal"]') ||
        target.closest(".MuiThemeProvider-root");

      if (isInConfirmationModal || isInDeliveryModal) {
        return;
      }

      if (
        cartRef.current &&
        !cartRef.current.contains(target) &&
        !isInConfirmationModal &&
        !isInDeliveryModal
      ) {
        toggleCart();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "";
    };
  }, [isCartOpen, toggleCart]); 

  const aplicarCupom = () => {
    if (!codigoCupom) {
      setErroCupom("Por favor, insira um código de cupom.");
      return;
    }

    const cuponsValidos: { [key: string]: number } = {
      PROMO10: 10,
    };

    if (cuponsValidos[codigoCupom.toUpperCase()]) {
      const percentualDesconto = cuponsValidos[codigoCupom.toUpperCase()];
      const valorDesconto = cartTotal * (percentualDesconto / 100);

      setDescontoAplicado(valorDesconto);
      setErroCupom("");
    } else {
      setErroCupom("Cupom inválido ou expirado.");
    }
  };

  const openCheckoutModal = () => {
    if (cartItems.length === 0) return;
    setIsCheckoutModalOpen(true);
  };
  const handleCheckout = (deliveryInfo: DeliveryInfo) => {
    if (cartItems.length === 0) return;

    CartService.checkoutViaWhatsApp(
      cartItems,
      cartTotal,
      descontoAplicado,
      deliveryInfo
    );

    setIsCheckoutModalOpen(false);
  };

  const totalComDesconto = cartTotal - descontoAplicado;

  const closeDeliveryModal = () => {
    setIsCheckoutModalOpen(false);

  };

  return (
    <>
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

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div
            className="absolute inset-0 bg-black/25 backdrop-blur-sm transition-opacity"
            onClick={toggleCart}
          />

          <div
            ref={cartRef}
            className="relative w-full max-w-md bg-white h-full shadow-xl overflow-hidden transform transition-transform animate-slide-in-right"
          >
            <div className="flex flex-col h-full">
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

                  <div className="mt-6">
                    <button
                      onClick={openCheckoutModal}
                      className="w-full bg-[var(--primary-color)] border border-transparent rounded-md py-3 px-4 font-medium text-white hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <DeliveryModalPage
        isOpen={isCheckoutModalOpen}
        onClose={closeDeliveryModal}
        onCheckout={handleCheckout}
      />
    </>
  );
}
