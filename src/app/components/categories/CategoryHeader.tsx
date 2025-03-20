"use client";

import React from "react";
import Link from "next/link";

interface CategoryHeaderProps {
  title: string;
  description: string;
  categoryId: number;
}

/**
 * Componente para exibir o cabeçalho de uma categoria na página principal
 * Versão simplificada sem caixa de contorno
 */
const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  description,
  categoryId,
}) => {
  // Site palette colors
  const textColor = "text-[#ff69b4]";
  const accentColor = "bg-[#ff69b4]";

  return (
    <div className="relative mb-0">
      {/* Content container */}
      <div className="p-5">
        {/* Category title with underline */}
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-1`}>
          {title}
        </h2>
        <div className={`h-1.5 w-32 ${accentColor} rounded-full mb-2`}></div>

        {/* Category description */}
        <p className="text-gray-600 max-w-3xl mb-0">{description}</p>
      </div>
    </div>
  );
};

export default CategoryHeader;
