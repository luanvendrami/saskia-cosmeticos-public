import React from "react";
import Link from "next/link";

interface Category {
  id: number;
  title: string;
  description: string;
  slug: string;
}

interface AllCategoriesProps {
  categories: Category[];
}

const AllCategories: React.FC<AllCategoriesProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map((category) => (
        <div
          key={category.id}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-pink-500/10 transition duration-300 hover:-translate-y-1"
        >
          <h3 className="text-2xl font-bold mb-3 text-pink-400">
            {category.title}
          </h3>
          <p className="text-gray-300 mb-5">{category.description}</p>
          <Link
            href={`/categories/${category.slug}`}
            className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition"
          >
            Ver produtos
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AllCategories;
