"use client";

import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '../productCard';
import { Product } from '../../data/products';

interface CategoryPageProps {
  categoryName: string;
  products: Product[];
}

export default function CategoryPage({ categoryName, products }: CategoryPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  // Filter products based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = products.filter(product => 
      product.name.toLowerCase().includes(lowercasedSearch) || 
      product.description.toLowerCase().includes(lowercasedSearch)
    );
    
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Display human-readable category name
  const getCategoryDisplayName = (categoryName: string) => {
    const displayNames: { [key: string]: string } = {
      'cabelos': 'Cabelos',
      'skincare': 'Skin Care',
      'maquiagem': 'Maquiagem',
      'perfumes': 'Perfumes',
      'corpo': 'Corpo'
    };
    
    return displayNames[categoryName] || categoryName;
  };

  const displayName = getCategoryDisplayName(categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header with search */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#ff69b4] mb-4 sm:mb-0">{displayName}</h1>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${displayName}...`}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
        </div>
        
        {/* Results count */}
        <p className="text-gray-600">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Product grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              imageUrl={product.image}
              title={product.name}
              description={product.description}
              price={`R$ ${product.price.toFixed(2).replace('.', ',')}`}
              category={displayName}
              hideViewAll={true} // Hide "View All" when already on category page
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 text-gray-300">
            <FiSearch className="w-full h-full" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-gray-500">
            We couldn't find any products matching your search.
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-4 py-2 bg-pink-100 text-pink-800 rounded-md hover:bg-pink-200 transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
} 