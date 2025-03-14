"use client";

/**
 * @fileoverview Página inicial da loja
 * Exibe carrosséis de produtos populares por categoria e banner promocional
 */

import Carrossel from "./components/carrossel";
import Footer from "./components/Footer";
import PromocionalBanner from "./components/PromocionalBanner";
import { CategoryHeader } from "./components/categories";
import {
  heroProducts,
  cabelosProducts,
  skincareProducts,
  maquiagemProducts,
  perfumesProducts,
  corpoProducts,
  CategoryProduct,
} from "./data/categories";

import { CarouselItem } from "./interfaces";

/**
 * Converte um array de produtos para CarouselItem[]
 * para compatibilidade com o componente Carrossel
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertToCarouselItems = (products: any[]): CarouselItem[] => {
  return products.map((product) => ({
    ...product,
    id: typeof product.id === "string" ? parseInt(product.id, 10) : product.id,
  })) as CarouselItem[];
};

/**
 * Componente da página inicial
 *
 * Exibe os produtos em destaque organizados por categoria
 * e elementos promocionais
 */
export default function Home() {
  /**
   * Configurações de breakpoints para os carrosséis
   * Define como os slides se ajustam em diferentes tamanhos de tela
   */
  const configuracaoCarrossel = {
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    375: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    425: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 2.2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1440: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  };

  /**
   * Adiciona um slide "Ver Todos" ao final de um array de produtos
   * e filtra apenas os produtos marcados como populares
   *
   * @param produtos Array de produtos da categoria
   * @param category Nome da categoria
   * @param urlPath Caminho da URL para a página da categoria
   * @returns Array de produtos filtrados com slide "Ver Todos" no final
   */
  const filtrarProdutosPopularesEAdicionarVerTodos = (
    produtos: CategoryProduct[],
    category: string,
    urlPath: string
  ) => {
    // Filtrar apenas os produtos marcados como topSell
    const produtosPopulares = produtos.filter(
      (product) => product.topSell === true
    );

    // Limitar para no máximo 7 produtos
    const produtosLimitados = produtosPopulares.slice(0, 7);

    // Adicionar slide "Ver Todos"
    const slideVerTodos = {
      id: `viewAll-${category}`,
      imageUrl: "/images/6fs55eT.jpeg",
      title: "Ver Todos",
      price: "",
      description: `Veja todos os produtos de ${category}`,
      primeiroCarrossel: false,
      category,
      isViewAllSlide: true,
      viewAllUrl: `/features/${urlPath}`,
      promocao: false,
      descontoPromocao: 0,
      cupom: "",
    };

    return [...produtosLimitados, slideVerTodos];
  };

  // Categorias organizadas com seus produtos
  const categorias = [
    {
      id: 1,
      titulo: "Cabelos",
      descricao: "Descubra os melhores produtos para cuidar dos seus cabelos.",
      urlPath: "cabelos",
      produtos: filtrarProdutosPopularesEAdicionarVerTodos(
        cabelosProducts,
        "Cabelos",
        "cabelos"
      ),
    },
    {
      id: 2,
      titulo: "Skin Care",
      descricao: "Descubra os melhores produtos para sua skin care.",
      urlPath: "skincare",
      produtos: filtrarProdutosPopularesEAdicionarVerTodos(
        skincareProducts,
        "Skin Care",
        "skincare"
      ),
    },
    {
      id: 3,
      titulo: "Maquiagem",
      descricao: "Descubra os melhores produtos para sua maquiagem.",
      urlPath: "maquiagem",
      produtos: filtrarProdutosPopularesEAdicionarVerTodos(
        maquiagemProducts,
        "Maquiagem",
        "maquiagem"
      ),
    },
    {
      id: 4,
      titulo: "Perfumes",
      descricao: "Descubra os melhores perfumes.",
      urlPath: "perfumes",
      produtos: filtrarProdutosPopularesEAdicionarVerTodos(
        perfumesProducts,
        "Perfumes",
        "perfumes"
      ),
    },
    {
      id: 5,
      titulo: "Corpo",
      descricao: "Descubra os melhores produtos para o seu corpo.",
      urlPath: "corpo",
      produtos: filtrarProdutosPopularesEAdicionarVerTodos(
        corpoProducts,
        "Corpo",
        "corpo"
      ),
    },
  ];

  return (
    <div className="bg-[#ffe1ff] min-h-screen">
      {/* Add new animation keyframes for our dynamic elements */}
      <style jsx global>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes slide-in-right {
          0% {
            transform: translateX(100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-left {
          0% {
            transform: translateX(-100px);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-top {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes slide-in-bottom {
          0% {
            transform: translateY(50px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes expand {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes rotate-pulse {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }
        .animate-ping-slow {
          animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        .animate-slide-in-right {
          animation: slide-in-right 1s forwards;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1s forwards;
        }
        .animate-slide-in-top {
          animation: slide-in-top 1s forwards;
        }
        .animate-slide-in-bottom {
          animation: slide-in-bottom 1s forwards;
        }
        .animate-expand {
          animation: expand 1s forwards;
        }
        .animate-rotate-pulse {
          animation: rotate-pulse 8s infinite;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
        .delay-900 {
          animation-delay: 0.9s;
        }
        .delay-1100 {
          animation-delay: 1.1s;
        }
      `}</style>

      <Carrossel
        items={heroProducts}
        slidesPerView={1}
        spaceBetween={0}
        autoplayDelay={4000}
        loop
        swiperClassName="w-full max-w-[1920px] mx-auto h-[400px] md:h-[400px] lg:h-[500px]"
      />

      {/* Banner Promocional */}
      <PromocionalBanner />

      {categorias.map((categoria) => (
        <div key={categoria.id} className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Use the CategoryHeader component */}
            <CategoryHeader
              title={categoria.titulo}
              description={categoria.descricao}
              categoryId={categoria.id}
            />

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(255,105,180,0.3)] bg-white/40 p-8 border-2 border-[#ff69b4]/20 hover:shadow-[0_15px_50px_-12px_rgba(255,105,180,0.4)] transition-shadow duration-300">
                <Carrossel
                  items={convertToCarouselItems(categoria.produtos)}
                  loop={false}
                  autoplayDelay={undefined}
                  centeredSlides={false}
                  slidesPerView={1}
                  spaceBetween={10}
                  swiperClassName="w-full h-[520px] md:h-[520px]"
                  breakpoints={configuracaoCarrossel}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Footer />
    </div>
  );
}
