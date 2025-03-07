"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductModal from "../ProductModal";
import { useCart } from "../../context/CartContext";
import { FiShoppingCart, FiEye } from "react-icons/fi";

interface ProductCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  link?: string;
  price?: string;
  category?: string;
  hideViewAll?: boolean;
}

export default function ProductCard({
  id,
  imageUrl,
  title,
  description,
  link,
  price,
  category,
  hideViewAll = false,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

  const handleClick = (e: React.MouseEvent) => {
    if (link) return; // If there's a link, let the anchor tag handle it
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
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

  // Map category display names to URL paths
  const getCategoryPath = (category?: string) => {
    if (!category) return "";
    
    const categoryMap: {[key: string]: string} = {
      "Cabelos": "cabelos",
      "Skin Care": "skincare",
      "Maquiagem": "maquiagem",
      "Perfumes": "perfumes",
      "Corpo": "corpo"
    };
    
    return categoryMap[category] || "";
  };

  return (
    <>
      <div 
        onClick={handleClick}
        className="group relative w-full sm:w-[280px] h-[500px] bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
      >
        <div className="relative w-full h-[300px] overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 280px"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* View All Products Button */}
          {category && !hideViewAll && (
            <Link 
              href={`/${getCategoryPath(category)}`}
              className="absolute bottom-16 right-4 p-2 bg-white text-[#ff69b4] rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100 z-10"
              onClick={(e) => e.stopPropagation()}
              aria-label={`View all ${category} products`}
            >
              <FiEye className="w-5 h-5" />
            </Link>
          )}
          
          {/* Add to Cart Button */}
          {price && (
            <button
              onClick={handleAddToCart}
              className="absolute bottom-4 right-4 p-2 bg-pink-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-pink-600"
              aria-label="Add to cart"
            >
              <FiShoppingCart className="w-5 h-5" />
            </button>
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
            <div className="mt-3 sm:mt-4 flex items-center justify-between">
              <p className="text-base sm:text-lg font-bold text-[#ff69b4]">{price}</p>
              <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider">Em estoque</span>
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
        hideViewAll={hideViewAll}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}