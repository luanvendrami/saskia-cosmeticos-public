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
  const textColor = "text-purple-700";
  const accentColor = "bg-purple-400";
  const buttonBgColor = "bg-purple-100";

  return (
    <div className="relative mb-0">
      {/* Content container */}
      <div className="p-4">
        {/* Category title with underline */}
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-1`}>
          {title}
        </h2>
        <div className={`h-1.5 w-32 ${accentColor} rounded-full mb-4`}></div>

        {/* Category description */}
        <p className="text-gray-600 max-w-3xl mb-6">{description}</p>
      </div>
    </div>
  );
};

export default CategoryHeader;
