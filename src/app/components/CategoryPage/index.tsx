"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { TextField, InputAdornment } from "@mui/material";
import ProductCard from "../productCard";
import { Product } from "../../interfaces/product";
import { CategoryPageProps } from "../../interfaces/category";
import { ProductService, DataService } from "../../services";
import FooterPage from "@/app/feature/footer/page";

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
      {/* Div para dar espaço para o header fixo */}
      <div className="h-5 md:h-32"></div>

      <div className="container mx-auto px-4 py-4 md:py-12">
        {/* Cabeçalho da página com pesquisa */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6">
            <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-4 sm:mb-0 slide-in-left">
              {nomeExibicao}
            </h1>

            <div className="w-full sm:w-96 fade-in">
              <TextField
                fullWidth
                value={termoPesquisa}
                onChange={(e) => setTermoPesquisa(e.target.value)}
                placeholder={`Buscar em ${nomeExibicao}...`}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiSearch
                        className="text-[var(--text-secondary)]"
                        suppressHydrationWarning
                      />
                    </InputAdornment>
                  ),
                  sx: {
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--primary-color)",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--primary-color)",
                      },
                    },
                  },
                }}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {produtosFiltrados.map((produto, index) => (
              <div
                key={produto.id}
                className="animate-fade-in flex justify-center sm:justify-start"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ProductCard
                  id={produto.id}
                  imageUrl={produto.image}
                  images={produto.images}
                  title={produto.name}
                  description={produto.description}
                  price={`R$ ${produto.price.toFixed(2).replace(".", ",")}`}
                  category={nomeExibicao}
                  hideViewAll={true}
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
              <FiSearch className="w-full h-full" suppressHydrationWarning />
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
      <FooterPage />
    </>
  );
}
