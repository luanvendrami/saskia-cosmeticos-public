"use client";

import React from "react";

interface CategoryHeaderProps {
  title: string;
  description: string;
  categoryId: number;
}

const CategorieProductHeader: React.FC<CategoryHeaderProps> = ({
  title,
  description,
  categoryId,
}) => {

  const textColor = "text-[var(--primary-color)]";
  const accentColor = "bg-[var(--primary-color)]";

  return (
    <div className="relative mb-0">
      <div className="p-5">
        <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-1`}>
          {title}
        </h2>
        <div className={`h-1.5 w-32 ${accentColor} rounded-full mb-2`}></div>
        <p className="text-[var(--text-secondary)] max-w-3xl mb-0">
          {description}
        </p>
      </div>
    </div>
  );
};

export default CategorieProductHeader;
