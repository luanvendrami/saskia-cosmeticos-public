"use client";

import React from "react";
import Link from "next/link";

interface CategoryCardProps {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageUrl?: string;
}

/**
 * Simplified CategoryCard component without box container
 * Just shows title with underline, description, and button
 */
const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  description,
  slug,
  imageUrl,
}) => {
  // Site palette colors using CSS variables
  const textColor = "text-[var(--primary-dark)]";
  const accentColor = "bg-[var(--primary-color)]";
  const buttonBgColor = "bg-[var(--primary-light)]";

  return (
    <Link href={`/category/${slug}`}>
      <div className="p-5">
        <div className="flex flex-col">
          {/* Category title with underline */}
          <h3 className={`${textColor} font-medium text-lg pb-1`}>{title}</h3>
          <div className={`h-1 w-16 ${accentColor} rounded-full mb-3`}></div>

          {/* Category description */}
          <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Button - simple claymorphic style */}
          <div
            className={`${buttonBgColor} rounded-full py-2 px-5 w-fit text-sm ${textColor} font-medium`}
            style={{
              boxShadow: "var(--shadow-sm)",
            }}
          >
            Explorar
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
