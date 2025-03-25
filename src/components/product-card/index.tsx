"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiGrid,
  FiArrowRight,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

import ProductModal from "@/components/product-modal";
import { useCart } from "@/context/cartContext";
import { ProductCardProps } from "@/interfaces";
import { ProductService } from "@/services";

export default function ProductCard({
  id,
  imageUrl,
  images,
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

  const aoClicar = (e: React.MouseEvent) => {
    if (link || isViewAllSlide) return; 
    e.preventDefault();
    setIsModalOpen(true);
  };

  const aoAdicionarAoCarrinho = (e: React.MouseEvent) => {
    e.stopPropagation(); 
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

  const categoryPath = category ? ProductService.getCategoryPath(category) : "";

  const precoComDesconto = price
    ? ProductService.calculateDiscountedPrice(
        price,
        promocao || false,
        descontoPromocao
      )
    : null;

  if (isViewAllSlide && title === "Ver Todos") {
    return (
      <Link
        href={viewAllUrl || `/${categoryPath}`}
        className="product-card product-card-hover flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-light)] to-[var(--secondary-light)] opacity-90"></div>

        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary-color)] opacity-20 rounded-full transform translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-[var(--secondary-color)] opacity-20 rounded-full transform -translate-x-20 translate-y-20"></div>

        <div className="relative h-full w-full flex flex-col items-center justify-center p-4 sm:p-8 text-center">
          <div className="mb-3 sm:mb-5 bg-[var(--primary-color)] p-3 sm:p-4 rounded-full">
            <FiGrid className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--text-light)]" />
          </div>

          {category && (
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary-color)]/80 text-[var(--text-light)] text-xs sm:text-sm font-medium mb-3 sm:mb-5">
              {category}
            </span>
          )}

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--primary-dark)] mb-2 sm:mb-3 pulse">
            Ver Todos os Produtos
          </h3>

          <p className="text-[var(--text-secondary)] mb-4 sm:mb-6 max-w-[90%] sm:max-w-[80%] text-sm sm:text-base">
            {description ||
              `Explore nossa coleção completa de produtos de ${
                category || "beleza"
              }`}
          </p>

          <div className="mt-2 sm:mt-auto btn btn-primary flex items-center justify-center text-sm sm:text-base">
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
            <div className="mb-1 flex-shrink-0">
              {category && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-[var(--primary-color)] bg-[var(--primary-light)] rounded-full">
                  {category}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-[var(--text-primary)] leading-tight line-clamp-2 mb-1">
              {title}
            </h3>

            <div className="text-xs text-[var(--primary-color)] flex-grow flex items-end pb-2">
              <span className="inline-block hover:underline cursor-pointer">
                Clique para ver detalhes
              </span>
            </div>
          </div>

          {price && (
            <div className="product-price-container">
              <div className="flex items-center mb-2">
                <p className="text-sm text-[var(--text-secondary)] line-through">
                  {price}
                </p>
                {promocao && (
                  <span className="ml-2 bg-[var(--primary-color)] text-white text-xs px-1.5 py-0.5 rounded font-medium">
                    -{descontoPromocao || 10}%
                  </span>
                )}
              </div>

              <div className="flex items-center mb-1.5">
                <span className="text-base sm:text-lg font-bold text-[var(--success-color)]">
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
              <div className="text-[10px] text-[var(--text-secondary)] flex items-center">
                {stockQuantity !== undefined && (
                  <span className="flex items-center">
                    {stockQuantity <= 0 ? (
                      <>
                        <FiXCircle className="mr-1 text-red-500" />{" "}
                        <span>Esgotado</span>
                      </>
                    ) : stockQuantity <= 3 ? (
                      <>
                        <FiAlertCircle className="mr-1 text-orange-500" />{" "}
                        <span>
                          Últimas {stockQuantity}{" "}
                          {stockQuantity === 1 ? "unidade" : "unidades"}!
                        </span>
                      </>
                    ) : stockQuantity <= 5 ? (
                      <>
                        <FiAlertCircle className="mr-1 text-orange-400" />{" "}
                        <span>Poucas unidades!</span>
                      </>
                    ) : stockQuantity <= 10 ? (
                      <>
                        <FiAlertCircle className="mr-1 text-[var(--primary-color)]" />{" "}
                        <span>Em estoque</span>
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="mr-1 text-[var(--success-color)]" />{" "}
                        <span>Em estoque</span>
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl={imageUrl}
        images={images}
        title={title}
        description={description}
        price={price}
        category={category}
        hideViewAll={hideViewAll}
        onAddToCart={aoAdicionarAoCarrinho}
        stockQuantity={stockQuantity}
        promocao={promocao}
        descontoPromocao={descontoPromocao}
        cupom={cupom}
      />
    </>
  );
}
