"use client";

import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '../productCard';
import { Product } from '../../interfaces/product';
import { CategoryPageProps } from '../../interfaces/category';
import { ProductService, DataService } from '../../services';

/**
 * Componente que exibe uma página completa de categoria de produtos
 * Inclui funcionalidades de pesquisa, filtragem e ordenação de produtos
 * 
 * @param categoryName - Nome da categoria
 * @param products - Lista de produtos a serem exibidos
 */
export default function CategoryPage({ categoryName, products }: CategoryPageProps) {
  const [termoPesquisa, setTermoPesquisa] = useState('');
  const [produtosFiltrados, setProdutosFiltrados] = useState<Product[]>([]);

  // Ordenação e filtragem de produtos usando DataService
  useEffect(() => {
    const filteredProducts = DataService.filterAndSortProducts(products, termoPesquisa);
    setProdutosFiltrados(filteredProducts);
  }, [termoPesquisa, products]);

  // Use ProductService to get the display name of the category
  const nomeExibicao = ProductService.getCategoryDisplayName(categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Cabeçalho da página com pesquisa */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#ff69b4] mb-4 sm:mb-0">{nomeExibicao}</h1>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={termoPesquisa}
              onChange={(e) => setTermoPesquisa(e.target.value)}
              placeholder={`Buscar em ${nomeExibicao}...`}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>
        
        {/* Contador de resultados */}
        <p className="text-gray-600">
          Mostrando {produtosFiltrados.length} {produtosFiltrados.length === 1 ? 'produto' : 'produtos'}
          {termoPesquisa && ` para "${termoPesquisa}"`}
        </p>
      </div>

      {/* Grid de produtos */}
      {produtosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtosFiltrados.map((produto) => (
            <ProductCard
              key={produto.id}
              id={produto.id}
              imageUrl={produto.image}
              title={produto.name}
              description={produto.description}
              price={`R$ ${produto.price.toFixed(2).replace('.', ',')}`}
              category={nomeExibicao}
              hideViewAll={true} // Oculta "Ver Todos" quando já estiver na página da categoria
              stockQuantity={produto.stockQuantity}
              promocao={produto.promocao}
              descontoPromocao={produto.descontoPromocao}
              cupom={produto.cupom}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 text-gray-300">
            <FiSearch className="w-full h-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">Nenhum produto encontrado</h3>
          <p className="mt-1 text-gray-500">
            Não encontramos produtos correspondentes à sua busca.
          </p>
          {termoPesquisa && (
            <button
              onClick={() => setTermoPesquisa('')}
              className="mt-4 px-4 py-2 bg-pink-100 text-pink-800 rounded-md hover:bg-pink-200 transition-colors"
            >
              Limpar busca
            </button>
          )}
        </div>
      )}
    </div>
  );
} 