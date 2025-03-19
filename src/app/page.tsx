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
    isMobile: product.isMobile || false,
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
    <div className="bg-[#ffe1ff] min-h-screen pt-5 md:pt-20">
      <div className="mt-0 sm:mt-16 md:mt-20">
        <Carrossel
          items={heroProducts}
          slidesPerView={1}
          spaceBetween={0}
          autoplayDelay={5000}
          loop
          swiperClassName="w-full max-w-[1200px] mx-auto h-[350px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[450px] 2xl:h-[450px] relative"
        />
      </div>

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
