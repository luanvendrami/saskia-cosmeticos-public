"use client";

import React from "react";

interface CategoryHeaderProps {
  title: string;
  description: string;
  categoryId: number;
}

/**
 * Componente para exibir o cabeçalho de uma categoria na página principal
 * Versão simplificada sem caixa de contorno
 */
const CategorieProductHeader: React.FC<CategoryHeaderProps> = ({
  title,
  description,
  categoryId,
}) => {
  // Site palette colors using CSS variables
  const textColor = "text-[var(--primary-color)]";
  const accentColor = "bg-[var(--primary-color)]";

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
        <p className="text-[var(--text-secondary)] max-w-3xl mb-0">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategorieProductHeader;
