"use client";

import React from "react";
import AllCategories from "./components/AllCategories";

const ExamplePage: React.FC = () => {
  // Sample category data
  const sampleCategories = [
    {
      id: 1,
      title: "Cabelos",
      description:
        "Produtos para todos os tipos de cabelos, desde shampoos e condicionadores até tratamentos profundos e ferramentas de styling.",
      slug: "cabelos",
    },
    {
      id: 2,
      title: "Cuidados para Pele",
      description:
        "Soluções completas para skincare, incluindo limpadores, hidratantes, máscaras faciais e produtos para tratamentos específicos.",
      slug: "pele",
    },
    {
      id: 3,
      title: "Maquiagem",
      description:
        "Produtos de beleza para realçar sua beleza natural, desde bases e corretivos até batons, sombras e acessórios.",
      slug: "maquiagem",
    },
    {
      id: 4,
      title: "Perfumes",
      description:
        "Fragrâncias exclusivas para todos os gostos, desde aromas florais e frutais até perfumes amadeirados e orientais.",
      slug: "perfumes",
    },
    {
      id: 5,
      title: "Cuidados para o Corpo",
      description:
        "Linha completa de produtos para o corpo, incluindo hidratantes, óleos corporais, esfoliantes e produtos para banho.",
      slug: "corpo",
    },
    {
      id: 6,
      title: "Acessórios",
      description:
        "Ferramentas e acessórios essenciais para sua rotina de beleza, incluindo pincéis, esponjas, secadores e muito mais.",
      slug: "acessorios",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
            Saskia Cosméticos
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubra nossa coleção de produtos de beleza premium para realçar
            sua beleza natural
          </p>
        </header>

        {/* Using our AllCategories component */}
        <AllCategories categories={sampleCategories} />

        <footer className="mt-32 text-center text-gray-400 text-sm">
          <p>© 2023 Saskia Cosméticos. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default ExamplePage;
