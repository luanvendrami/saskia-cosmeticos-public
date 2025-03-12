"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductModal from "../ProductModal";
import { useCart } from "../../context/CartContext";
import { FiGrid, FiArrowRight, FiAlertCircle, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { ProductCardProps } from "../../interfaces/productCard";
import { ProductService } from "../../services";


/**
 * Componente que exibe um cartão de produto com opções de visualização rápida e adição ao carrinho
 * 
 * @param id - Identificador único do produto
 * @param imageUrl - URL da imagem do produto
 * @param title - Título do produto
 * @param description - Descrição do produto
 * @param link - Link opcional para navegação
 * @param price - Preço do produto
 * @param category - Categoria do produto
 * @param hideViewAll - Indica se deve ocultar a opção "Ver Todos"
 * @param isViewAllSlide - Indica se este cartão é um slide "Ver Todos"
 * @param viewAllUrl - URL para a página "Ver Todos" da categoria
 * @param stockQuantity - Quantidade em estoque
 */
export default function ProductCard({
  id,
  imageUrl,
  title,
  description,
  price,
  category,
  link,
  hideViewAll,
  isViewAllSlide,
  viewAllUrl,
  stockQuantity,
  promocao,
  descontoPromocao,
  cupom
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  /**
   * Manipula o clique no cartão do produto
   * Abre o modal se não houver link ou se não for um slide "Ver Todos"
   * 
   * @param e - Evento de clique
   */
  const aoClicar = (e: React.MouseEvent) => {
    if (link || isViewAllSlide) return; // Se tiver link ou for um slide "Ver Todos", deixa o link tratar o evento
    e.preventDefault();
    // Sempre abre o modal, mesmo para produtos sem estoque
    setIsModalOpen(true);
  };

  /**
   * Adiciona o produto ao carrinho quando o ícone de carrinho é clicado
   * 
   * @param e - Evento de clique
   */
  const aoAdicionarAoCarrinho = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previne propagação do evento de clique para o cartão
    if (price) {
      addToCart({
        id,
        imageUrl,
        title,
        description,
        price
      });
    }
  };
  
  // Get the category path using ProductService
  const categoryPath = category ? ProductService.getCategoryPath(category) : "";
  
  // Get the discounted price using ProductService
  const precoComDesconto = price 
    ? ProductService.calculateDiscountedPrice(price, promocao || false, descontoPromocao) 
    : null;

  // Check if this is a "Ver Todos" card
  if (isViewAllSlide && title === "Ver Todos") {
    return (
      <Link 
        href={viewAllUrl || `/${categoryPath}`}
        className="group relative w-full sm:w-[280px] h-[500px] overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-pink-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
      >
        {/* Gradient Background - Lightened for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 opacity-90"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300 opacity-20 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-300 opacity-20 rounded-full transform -translate-x-20 translate-y-20"></div>
        
        <div className="relative h-full w-full flex flex-col items-center justify-center p-8 text-center">
          {/* Icon */}
          <div className="mb-5 bg-[#ff69b4] p-4 rounded-full">
            <FiGrid className="w-10 h-10 text-white" />
          </div>
          
          {/* Category */}
          {category && (
            <span className="inline-block px-4 py-1 rounded-full bg-[#ff69b4]/80 text-white text-sm font-medium mb-5">
              {category}
            </span>
          )}
          
          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[#ff1493] mb-3">
            Ver Todos os Produtos
          </h3>
          
          {/* Description */}
          <p className="text-gray-700 mb-6 max-w-[80%]">
            {description || `Explore nossa coleção completa de produtos de ${category || 'beleza'}`}
          </p>
          
          {/* Call to action button */}
          <div className="mt-auto inline-flex items-center justify-center bg-[#ff69b4] text-white py-2 px-6 rounded-lg font-medium transition-transform group-hover:scale-105 shadow-md">
            Ver Coleção
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div 
        onClick={aoClicar}
        className="group relative w-full sm:w-[280px] h-[500px] bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
      >
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-110 ${stockQuantity === 0 ? 'grayscale' : ''}`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Out of Stock Overlay */}
          {stockQuantity === 0 && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <div className="bg-red-500 text-white px-6 py-2 rounded-sm font-bold tracking-wider text-lg transform -rotate-12 shadow-lg">
                ESGOTADO
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 h-[200px] flex flex-col justify-between bg-gradient-to-b from-white to-gray-50">
          <div className="flex-grow overflow-hidden">
            {category && (
              <span className="inline-block px-2 py-1 text-xs font-medium text-[#ff69b4] bg-pink-50 rounded-full mb-2">
                {category}
              </span>
            )}
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 truncate tracking-tight">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>
          
          {price && (
            <div className="mt-3">
              {/* Original Price + Discount */}
              <div className="flex items-center mb-2">
                <p className="text-sm text-gray-500 line-through">{price}</p>
                {promocao && (
                  <span className="ml-2 bg-[#ff69b4] text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    -{descontoPromocao || 10}%
                  </span>
                )}
              </div>
              
              {/* Final Price Row */}
              <div className="flex items-center mb-1.5">
                <span className="text-base sm:text-lg font-bold text-green-600">
                  {promocao && precoComDesconto ? `R$ ${precoComDesconto}` : price}
                </span>
                {promocao && cupom && (
                  <span className="ml-2 text-[10px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded-sm font-medium">
                    {cupom}
                  </span>
                )}
              </div>
              
              {/* Stock Status - Directly display status */}
              <div className="flex justify-between items-center mt-1">
                {typeof stockQuantity === 'number' && (
                  <span className={stockQuantity <= 0 
                    ? "text-[10px] sm:text-xs tracking-wider text-red-500 uppercase font-medium flex items-center"
                    : stockQuantity <= 3
                    ? "text-[10px] sm:text-xs tracking-wider text-orange-500 uppercase font-medium flex items-center"
                    : stockQuantity <= 5
                    ? "text-[10px] sm:text-xs tracking-wider text-orange-400 uppercase font-medium flex items-center"
                    : stockQuantity <= 10
                    ? "text-[10px] sm:text-xs tracking-wider text-[#ff69b4] uppercase font-medium flex items-center"
                    : "text-[10px] sm:text-xs tracking-wider text-green-600 uppercase font-medium flex items-center"
                  }>
                    {stockQuantity <= 0 
                      ? <><FiXCircle className="mr-1 text-red-500" /> Esgotado</>
                      : stockQuantity <= 3
                      ? <><FiAlertCircle className="mr-1 text-orange-500" /> Apenas {stockQuantity} {stockQuantity === 1 ? 'unidade' : 'unidades'}!</>
                      : stockQuantity <= 5
                      ? <><FiAlertCircle className="mr-1 text-orange-400" /> Últimas unidades!</>
                      : stockQuantity <= 10
                      ? <><FiAlertCircle className="mr-1 text-[#ff69b4]" /> Poucas unidades</>
                      : <><FiCheckCircle className="mr-1 text-green-600" /> Em estoque</>
                    }
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {link && (
          <a
            href={link}
            className="absolute inset-0 focus:ring-2 focus:ring-[#ff69b4] focus:outline-none rounded-2xl"
            aria-label={`Ver detalhes de ${title}`}
          />
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={imageUrl}
        title={title}
        description={description}
        price={price}
        category={category}
        hideViewAll={hideViewAll || isViewAllSlide}
        onAddToCart={aoAdicionarAoCarrinho}
        stockQuantity={stockQuantity}
        promocao={promocao}
        descontoPromocao={descontoPromocao}
        cupom={cupom}
      />
    </>
  );
}