"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiShoppingCart, FiEye, FiAlertCircle, FiCheckCircle, FiXCircle, FiX } from "react-icons/fi";
import { FaWhatsapp, FaThumbsUp } from "react-icons/fa";
import { useToast } from "../../contexts/ToastContext";

/**
 * Interface que define as propriedades do componente de modal de produto
 */
interface PropModalProduto {
  isOpen: boolean;           // Indica se o modal está aberto
  onClose: () => void;       // Função para fechar o modal
  imageUrl: string;          // URL da imagem do produto
  title: string;             // Título do produto
  description: string;       // Descrição do produto
  price?: string;            // Preço do produto (opcional)
  category?: string;         // Categoria do produto (opcional)
  hideViewAll?: boolean;     // Indica se deve ocultar a opção "Ver Todos" (opcional)
  onAddToCart?: (e: React.MouseEvent) => void; // Função para adicionar ao carrinho (opcional)
  stockQuantity?: number;    // Quantidade em estoque (opcional)
  promocao?: boolean;        // Indica se o produto está em promoção (opcional)
  descontoPromocao?: number; // Porcentagem de desconto aplicada na promoção (opcional)
  cupom?: string;            // Código do cupom de desconto (opcional)
}

/**
 * Componente que exibe um modal detalhado de produto
 * Permite visualizar mais informações e adicionar ao carrinho
 * 
 * @param isOpen - Indica se o modal está aberto
 * @param onClose - Função para fechar o modal
 * @param imageUrl - URL da imagem do produto
 * @param title - Título do produto
 * @param description - Descrição do produto
 * @param price - Preço do produto
 * @param category - Categoria do produto
 * @param hideViewAll - Indica se deve ocultar a opção "Ver Todos"
 * @param onAddToCart - Função para adicionar ao carrinho
 * @param stockQuantity - Quantidade em estoque
 */
export default function ModalProduto({
  isOpen,
  onClose,
  imageUrl,
  title,
  description,
  price,
  category,
  hideViewAll = false,
  onAddToCart,
  stockQuantity,
  promocao,
  descontoPromocao,
  cupom
}: PropModalProduto) {
  // Get the toast functionality from context
  const { showToast } = useToast();

  // State for the in-modal notification
  const [showAddedNotification, setShowAddedNotification] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

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

  /**
   * Mapeia nomes de categoria para seus respectivos caminhos de URL
   * 
   * @param category - Nome da categoria
   * @returns Caminho da URL correspondente à categoria
   */
  const obterCaminhoCategoria = (category?: string) => {
    if (!category) return "";
    
    const mapaCategorias: {[key: string]: string} = {
      "Cabelos": "cabelos",
      "Skin Care": "skincare",
      "Maquiagem": "maquiagem",
      "Perfumes": "perfumes",
      "Corpo": "corpo"
    };
    
    return mapaCategorias[category] || "";
  };

  /**
   * Calcula o preço com desconto aplicado
   * 
   * @param precoOriginal - Preço original em formato string (ex: "R$ 99,90")
   * @returns Preço com desconto formatado (ex: "89,91")
   */
  const calcularPrecoComDesconto = (precoOriginal: string) => {
    if (!precoOriginal) return null;
    
    // Só calcula desconto se o produto estiver em promoção
    if (!promocao) return null;
    
    // Extrai o valor numérico da string de preço (ex: "R$ 99,90" -> 99.90)
    const valorPreco = parseFloat(precoOriginal.replace('R$ ', '').replace(',', '.'));
    
    // Aplica o desconto configurado (valor padrão é 10% se não for especificado)
    const percentualDesconto = descontoPromocao || 10;
    const valorComDesconto = valorPreco * (1 - percentualDesconto / 100);
    
    // Format back to Brazilian currency format (without R$ prefix)
    return valorComDesconto.toFixed(2).replace('.', ',');
  };
  
  // Obtém o preço com desconto se o preço existir
  const precoComDesconto = price ? calcularPrecoComDesconto(price) : null;

  /**
   * Obtém a mensagem e estilo de status de estoque apropriados
   * com base na quantidade em estoque
   * 
   * @returns Objeto contendo mensagem, classe CSS e ícone para o status de estoque
   */
  const obterStatusEstoque = () => {
    // Default to 10 units if stockQuantity is undefined
    const quantidade = typeof stockQuantity === 'number' ? stockQuantity : 10;
    
    if (quantidade <= 0) {
      return {
        message: "Esgotado",
        className: "text-red-500 uppercase font-medium flex items-center",
        icon: <FiXCircle className="mr-1 text-red-500" />
      };
    } else if (quantidade <= 3) {
      return {
        message: `Apenas ${quantidade} ${quantidade === 1 ? 'unidade' : 'unidades'}!`,
        className: "text-orange-500 uppercase font-medium flex items-center",
        icon: <FiAlertCircle className="mr-1 text-orange-500" />
      };
    } else if (quantidade <= 5) {
      return {
        message: "Últimas unidades!",
        className: "text-orange-400 uppercase font-medium flex items-center",
        icon: <FiAlertCircle className="mr-1 text-orange-400" />
      };
    } else if (quantidade <= 10) {
      return {
        message: "Poucas unidades",
        className: "text-[#ff69b4] uppercase font-medium flex items-center",
        icon: <FiAlertCircle className="mr-1 text-[#ff69b4]" />
      };
    } else {
      return {
        message: "Em estoque",
        className: "text-green-600 uppercase font-medium flex items-center",
        icon: <FiCheckCircle className="mr-1 text-green-600" />
      };
    }
  };
  
  const statusEstoque = obterStatusEstoque();

  /**
   * Formata a mensagem de notificação para ser enviada via WhatsApp
   * quando um produto estiver esgotado
   * 
   * @returns Mensagem formatada para notificação de disponibilidade
   */
  const formatarMensagemNotificacaoEstoque = () => {
    // Formatar uma mensagem para enviar pelo WhatsApp
    // Incluir informações sobre o produto e solicitar notificação quando estiver disponível
    return encodeURIComponent(
      `Olá! Estou interessado(a) no produto *${title}* que está esgotado no momento. ` +
      `Por favor, me avise quando estiver disponível novamente. Obrigado(a)!`
    );
  };

  /**
   * Abre o WhatsApp com uma mensagem pré-formatada para solicitar
   * notificação quando o produto estiver disponível
   */
  const abrirNotificacaoWhatsApp = () => {
    // Número de telefone para WhatsApp - deve ser configurado conforme o número da loja
    const numeroWhatsApp = "5547997273738"; // Exemplo: 5511999999999
    
    // Formatar a mensagem
    const mensagem = formatarMensagemNotificacaoEstoque();
    
    // Abrir a URL do WhatsApp em uma nova janela
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagem}`, '_blank');
  };

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
      <div className="relative w-full max-w-2xl mx-4 animate-modal-slide-up max-h-[80vh] md:max-h-[90vh] overflow-auto">
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
              <div className={`px-1 w-full max-w-sm ${isExiting ? 'animate-slide-out-top' : 'animate-slide-in-top'}`}>
                <div className="flex items-center bg-white rounded-lg shadow-xl overflow-hidden border border-green-200">
                  {/* Left colored section with icon */}
                  <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 flex items-center justify-center">
                    <div className="animate-thumbs-up">
                      <FaThumbsUp className="text-white w-6 h-6" />
                    </div>
                  </div>
                  
                  {/* Content section */}
                  <div className="flex-1 px-4 py-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-gray-800">Sucesso!</h3>
                      <button
                        onClick={() => {
                          setIsExiting(true);
                          setTimeout(() => {
                            setShowAddedNotification(false);
                            setIsExiting(false);
                          }, 400);
                        }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-semibold text-pink-500">{title}</span> adicionado ao seu carrinho!
                    </p>
                  </div>
                  
                  {/* Animated border indicator */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 animate-shimmer w-full"></div>
                </div>
              </div>
            </div>
          )}

          {/* Image */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className={`object-cover ${stockQuantity === 0 ? 'grayscale' : ''}`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 1024px"
              priority
            />
            
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
          <div className="p-4 sm:p-6 bg-gradient-to-b from-white to-gray-50">
            {category && (
              <span className="inline-block px-3 py-1 text-sm font-medium text-[#ff69b4] bg-pink-50 rounded-full mb-2 sm:mb-3">
                {category}
              </span>
            )}
            
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-tight">
              {title}
            </h3>

            <div className="mt-3 sm:mt-4">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{description}</p>
            </div>

            {price && (
              <div className="mt-4 sm:mt-6">
                {/* Preço e desconto */}
                <div className="flex items-center mb-2 sm:mb-4">
                  <p className="text-lg sm:text-xl text-gray-500 line-through">{price}</p>
                  {promocao && (
                    <span className="ml-3 bg-[#ff69b4] text-white text-xs sm:text-sm px-2 py-0.5 rounded font-medium">
                      -{descontoPromocao || 10}%
                    </span>
                  )}
                </div>

                {/* Preço final */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl sm:text-2xl font-bold text-green-600">
                    {promocao && precoComDesconto ? `R$ ${precoComDesconto}` : price}
                  </span>
                  {promocao && cupom && (
                    <div className="bg-green-100 px-2 sm:px-3 py-1 rounded-md">
                      <span className="text-xs sm:text-sm text-green-800 font-medium">
                        Cupom: {cupom}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Stock Status */}
                <div className="flex justify-between items-center mt-2">
                  <span className={`text-xs sm:text-sm tracking-wider ${statusEstoque.className}`}>
                    {statusEstoque.icon} {statusEstoque.message}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {/* Add to Cart Button - Disable if out of stock */}
              {price && onAddToCart && (
                <>
                  {stockQuantity === 0 ? (
                    <button
                      className="w-full py-2.5 sm:py-3 rounded-lg flex items-center justify-center gap-1 sm:gap-2 bg-white border-2 border-gray-300 text-gray-700 text-sm sm:text-base hover:bg-gray-50 transition-colors shadow-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        abrirNotificacaoWhatsApp();
                      }}
                    >
                      <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      Avise-me quando disponível
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="w-full py-2.5 sm:py-3 bg-pink-500 text-white rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base hover:bg-pink-600 transition-colors"
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
                  href={`/${obterCaminhoCategoria(category)}`}
                  className="w-full py-2.5 sm:py-3 bg-white border border-pink-500 text-pink-500 rounded-lg flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base hover:bg-pink-50 transition-colors"
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
  return typeof document !== 'undefined' 
    ? createPortal(modalContent, document.body) 
    : null;
} 