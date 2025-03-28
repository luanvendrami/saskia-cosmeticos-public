"use client";

import CategorieProductHeader from "../components/categorie-product-header";
import {
  heroProducts,
  cabelosProducts,
  skincareProducts,
  maquiagemProducts,
  perfumesProducts,
  corpoProducts,
  CategoryProduct,
} from "../data/categories";

import { CarouselItem } from "../interfaces";
import Footer from "@/components/ui/footer";
import InitialBanner from "@/components/inital-banner";
import PromocionalBanner from "@/components/promotional-banner";
import GenericCarousel from "@/components/ui/generic-carousel";
import ProductCard from "@/components/product-card";

const convertToCarouselItems = (products: any[]): CarouselItem[] => {
  return products.map((product) => ({
    ...product,
    id: typeof product.id === "string" ? parseInt(product.id, 10) : product.id,
    isMobile: product.isMobile || false,
  })) as CarouselItem[];
};

export default function Home() {

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
      slidesPerView: 1.2,
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

 
  const filtrarProdutosPopularesEAdicionarVerTodos = (
    produtos: CategoryProduct[],
    category: string,
    urlPath: string
  ) => {
    const produtosPopulares = produtos.filter(
      (product) => product.topSell === true
    );

    const produtosLimitados = produtosPopulares.slice(0, 7);

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
    <div className="bg-[var(--primary-light)] min-h-screen pt-5 md:pt-20">
      <div className="mt-0 sm:mt-16 md:mt-20">
        <GenericCarousel
          items={heroProducts}
          slidesPerView={1}
          spaceBetween={0}
          autoplayDelay={4700}
          loop
          swiperClassName="w-full max-w-[1200px] mx-auto h-[350px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[450px] 2xl:h-[450px] relative"
          renderItem={(
            item: {
              imageUrl: string;
              backupImageUrl?: string;
              title?: string;
              category?: string;
            },
            isMobile: any
          ) => (
            <InitialBanner
              imageUrl={item.imageUrl}
              backupImageUrl={item.backupImageUrl}
              alt={item.title}
              category={item.category}
            />
          )}
        />
      </div>

      <PromocionalBanner />

      {categorias.map((categoria) => (
        <div key={categoria.id} className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <CategorieProductHeader
              title={categoria.titulo}
              description={categoria.descricao}
              categoryId={categoria.id}
            />

            <div className="relative mt-2">
              <div className="rounded-2xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(255,105,180,0.3)] bg-white/40 p-8 border-2 border-[#ff69b4]/20 hover:shadow-[0_15px_50px_-12px_rgba(255,105,180,0.4)] transition-shadow duration-300">
                <GenericCarousel
                  items={convertToCarouselItems(categoria.produtos)}
                  loop={false}
                  autoplayDelay={undefined}
                  centeredSlides={false}
                  slidesPerView={1}
                  spaceBetween={10}
                  swiperClassName="w-full h-[520px] md:h-[520px]"
                  breakpoints={configuracaoCarrossel}
                  renderItem={(item: {
                    id?: any;
                    imageUrl?: any;
                    title?: any;
                    price?: any;
                    description?: any;
                    link?: any;
                    category?: any;
                    isViewAllSlide?: any;
                    viewAllUrl?: any;
                    stockQuantity?: any;
                    promocao?: any;
                    descontoPromocao?: any;
                    cupom?: any;
                  }) => (
                    <ProductCard
                      id={item.id}
                      imageUrl={item.imageUrl}
                      title={item.title}
                      price={item.price}
                      description={item.description}
                      link={item.link}
                      category={item.category}
                      isViewAllSlide={item.isViewAllSlide}
                      viewAllUrl={item.viewAllUrl}
                      stockQuantity={item.stockQuantity}
                      promocao={item.promocao}
                      descontoPromocao={item.descontoPromocao}
                      cupom={item.cupom}
                    />
                  )}
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
