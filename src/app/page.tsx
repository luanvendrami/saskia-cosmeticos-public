/**
 * @fileoverview Página inicial da loja
 * Exibe carrosséis de produtos populares por categoria e banner promocional
 */

import Carrossel from "./components/carrossel";
import Footer from "./components/Footer";
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
   * Filtra produtos populares e adiciona slide "Ver Todos" no final
   *
   * @param produtos - Lista de produtos da categoria
   * @param category - Nome da categoria para exibição
   * @param urlPath - Caminho da URL para a página "Ver Todos"
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
      viewAllUrl: `/${urlPath}`,
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
      <Carrossel
        items={heroProducts}
        slidesPerView={1}
        spaceBetween={0}
        autoplayDelay={4000}
        loop
        swiperClassName="w-full max-w-[1920px] mx-auto h-[400px] md:h-[400px] lg:h-[500px]"
      />

      {/* Banner de Promoção */}
      <div className="bg-[#ff69b4]/10 py-3 px-4 text-center text-gray-700 rounded-lg shadow-sm mb-8 transition-all hover:bg-[#ff69b4]/20">
        <p className="text-sm md:text-base">
          Use o cupom{" "}
          <span className="font-mono bg-pink-100 text-[ ] px-1.5 py-0.5 rounded mx-1">
            PROMO10
          </span>{" "}
          e ganhe 10% OFF na sua compra em pagamento a vista ou pix!
        </p>
      </div>

      {categorias.map((categoria) => (
        <div key={categoria.id} className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#ff69b4] mb-4 tracking-tight animate-modal-slide-up">
                {categoria.titulo}
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-[#ff69b4] to-[#ff1493] mx-auto mb-6 rounded-full shadow-lg"></div>
              <p className="text-lg md:text-xl text-[#ff69b4]/90 max-w-2xl mx-auto leading-relaxed font-medium">
                {categoria.descricao}
              </p>
            </div>

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
