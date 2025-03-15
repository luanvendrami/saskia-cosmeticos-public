"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../productCard";
import { Product } from "../../interfaces/product";
import { CategoryPageProps } from "../../interfaces/category";
import { ProductService, DataService } from "../../services";
import Footer from "../Footer";

/**
 * Componente que exibe uma página completa de categoria de produtos
 * Inclui funcionalidades de pesquisa, filtragem e ordenação de produtos
 *
 * @param categoryName - Nome da categoria
 * @param products - Lista de produtos a serem exibidos
 */
export default function CategoryPage({
  categoryName,
  products,
}: CategoryPageProps) {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>([]);

  // Ordenação e filtragem de produtos usando DataService
  useEffect(() => {
    const filteredProducts = DataService.filterAndSortProducts(
      products,
      termoPesquisa
    );
    setProdutosFiltrados(filteredProducts);
  }, [termoPesquisa, products]);

  // Use ProductService to get the display name of the category
  const nomeExibicao = ProductService.getCategoryDisplayName(categoryName);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho da página com pesquisa */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4 sm:mb-0 slide-in-left">
              {nomeExibicao}
            </h1>

            <div className="relative fade-in">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-[var(--text-secondary)]" />
              </div>
              <input
                type="text"
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                placeholder={`Buscar em ${nomeExibicao}...`}
                className="block w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg search-input-focus"
              />
            </div>
          </div>

          {/* Contador de resultados */}
          <p className="text-[var(--text-secondary)]">
            Mostrando {produtosFiltrados.length}{" "}
            {produtosFiltrados.length === 1 ? "produto" : "produtos"}
            {termoPesquisa && ` para "${termoPesquisa}"`}
          </p>
        </div>

        {/* Grid de produtos */}
        {produtosFiltrados.length > 0 ? (
          <div className="product-card-container">
            {produtosFiltrados.map((produto, index) => (
              <div
                key={produto.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard
                  id={produto.id}
                  imageUrl={produto.image}
                  title={produto.name}
                  description={produto.description}
                  price={`R$ ${produto.price.toFixed(2).replace(".", ",")}`}
                  category={nomeExibicao}
                  hideViewAll={true} // Oculta "Ver Todos" quando já estiver na página da categoria
                  stockQuantity={produto.stockQuantity}
                  promocao={produto.promocao}
                  descontoPromocao={produto.descontoPromocao}
                  cupom={produto.cupom}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center fade-in">
            <div className="w-16 h-16 mb-4 text-[var(--text-secondary)]">
              <FiSearch className="w-full h-full" />
            </div>
            <h3 className="text-lg font-medium text-[var(--text-primary)]">
              Nenhum produto encontrado
            </h3>
            <p className="mt-1 text-[var(--text-secondary)]">
              Não encontramos produtos correspondentes à sua busca.
            </p>
            {termoPesquisa && (
              <button
                onClick={() => setTermoPesquisa("")}
                className="btn btn-secondary mt-4"
              >
                Limpar busca
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
