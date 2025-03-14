"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductModal from "../ProductModal";
import { useCart } from "../../context/CartContext";
import {
  FiGrid,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
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
  cupom,
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
        price,
      });
    }
  };

  // Get the category path using ProductService
  const categoryPath = category ? ProductService.getCategoryPath(category) : "";

  // Get the discounted price using ProductService
  const precoComDesconto = price
    ? ProductService.calculateDiscountedPrice(
        price,
        promocao || false,
        descontoPromocao
      )
    : null;

  // Check if this is a "Ver Todos" card
  if (isViewAllSlide && title === "Ver Todos") {
    return (
      <Link
        href={viewAllUrl || `/${categoryPath}`}
        className="product-card product-card-hover"
      >
        {/* Gradient Background - Using our theme variables */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 opacity-90"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-300 opacity-20 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-300 opacity-20 rounded-full transform -translate-x-20 translate-y-20"></div>

        <div className="relative h-full w-full flex flex-col items-center justify-center p-8 text-center">
          {/* Icon */}
          <div className="mb-5 bg-[var(--primary-color)] p-4 rounded-full">
            <FiGrid className="w-10 h-10 text-[var(--text-light)]" />
          </div>

          {/* Category */}
          {category && (
            <span className="inline-block px-4 py-1 rounded-full bg-[var(--primary-color)]/80 text-[var(--text-light)] text-sm font-medium mb-5">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-[var(--primary-dark)] mb-3 pulse">
            Ver Todos os Produtos
          </h3>

          {/* Description */}
          <p className="text-[var(--text-secondary)] mb-6 max-w-[80%]">
            {description ||
              `Explore nossa coleção completa de produtos de ${
                category || "beleza"
              }`}
          </p>

          {/* Call to action button with our button classes */}
          <div className="mt-auto btn btn-primary flex items-center justify-center">
            Ver Coleção
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div onClick={aoClicar} className="product-card product-card-hover">
        <div className="product-image-container">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-300 group-hover:scale-110 ${
              stockQuantity === 0 ? "grayscale" : ""
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Out of Stock Overlay */}
          {stockQuantity === 0 && (
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
              <div className="bg-[var(--error-color)] text-[var(--text-light)] px-6 py-2 rounded-sm font-bold tracking-wider text-lg transform -rotate-12 shadow-lg">
                ESGOTADO
              </div>
            </div>
          )}
        </div>

        <div className="product-content">
          <div className="product-details">
            {/* Category tag */}
            <div className="mb-1 flex-shrink-0">
              {category && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-[var(--primary-color)] bg-pink-50 rounded-full">
                  {category}
                </span>
              )}
            </div>

            {/* Title - without fixed height */}
            <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-tight line-clamp-2 mb-1">
              {title}
            </h3>

            {/* "Clique para ver detalhes" - now positioned with flex behavior */}
            <div className="text-xs text-[var(--primary-color)] flex-grow flex items-end pb-2">
              <span className="inline-block hover:underline cursor-pointer">
                Clique para ver detalhes
              </span>
            </div>
          </div>

          {price && (
            <div className="product-price-container">
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
                  {promocao && precoComDesconto
                    ? `R$ ${precoComDesconto}`
                    : price}
                </span>
                {promocao && cupom && (
                  <span className="ml-2 text-[10px] text-green-700 bg-green-100 px-1.5 py-0.5 rounded-sm font-medium">
                    {cupom}
                  </span>
                )}
              </div>

              {/* Stock Status - Directly display status */}
              <div className="text-[10px] text-gray-500 flex items-center">
                {stockQuantity !== undefined && (
                  <span className="flex items-center">
                    {stockQuantity <= 0 ? (
                      <>
                        <FiXCircle className="mr-1 text-red-500" /> Esgotado
                      </>
                    ) : stockQuantity <= 3 ? (
                      <>
                        <FiAlertCircle className="mr-1 text-orange-500" />{" "}
                        Apenas {stockQuantity}{" "}
                        {stockQuantity === 1 ? "unidade" : "unidades"}!
                      </>
                    ) : stockQuantity <= 5 ? (
                      <>
                        <FiAlertCircle className="mr-1 text-orange-400" />{" "}
                        Últimas unidades!
                      </>
                    ) : stockQuantity <= 10 ? (
                      <>
                        <FiAlertCircle className="mr-1 text-[#ff69b4]" /> Poucas
                        unidades
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="mr-1 text-green-600" /> Em
                        estoque
                      </>
                    )}
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
