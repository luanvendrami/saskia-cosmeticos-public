import Carrossel from "./components/carrossel";
import Footer from "./components/Footer";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { 
  heroProducts, 
  cabelosProducts, 
  skincareProducts, 
  maquiagemProducts, 
  perfumesProducts, 
  corpoProducts,
  Product
} from "./data/categories";

export default function Home() {
  const carrosselBreakpoints = {
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

  // Função para limitar produtos e adicionar slide "Ver Todos"
  const limitProductsAndAddViewAll = (produtos: Product[], category: string, urlPath: string) => {
    // Limitar para 7 produtos
    const limitedProducts = produtos.slice(0, 7);
    
    // Adicionar slide "Ver Todos"
    const viewAllSlide = {
      id: `viewAll-${category}`,
      imageUrl: "/images/6fs55eT.jpeg",
      title: "Ver Todos",
      price: "",
      description: `Veja todos os produtos de ${category}`,
      primeiroCarrossel: false,
      category,
      isViewAllSlide: true,
      viewAllUrl: `/${urlPath}`
    };
    
    return [...limitedProducts, viewAllSlide];
  };

  // Categorias organizadas com seus produtos
  const categorias = [
    {
      id: 1,
      titulo: "Cabelos",
      descricao: "Descubra os melhores produtos para cuidar dos seus cabelos.",
      urlPath: "cabelos",
      produtos: limitProductsAndAddViewAll(cabelosProducts, "Cabelos", "cabelos")
    },
    {
      id: 2,
      titulo: "Skin Care",
      descricao: "Descubra os melhores produtos para sua skin care.",
      urlPath: "skincare",
      produtos: limitProductsAndAddViewAll(skincareProducts, "Skin Care", "skincare")
    },
    {
      id: 3,
      titulo: "Maquiagem",
      descricao: "Descubra os melhores produtos para sua maquiagem.",
      urlPath: "maquiagem",
      produtos: limitProductsAndAddViewAll(maquiagemProducts, "Maquiagem", "maquiagem")
    },
    {
      id: 4,
      titulo: "Perfumes",
      descricao: "Descubra os melhores perfumes.",
      urlPath: "perfumes",
      produtos: limitProductsAndAddViewAll(perfumesProducts, "Perfumes", "perfumes")
    },
    {
      id: 5,
      titulo: "Corpo",
      descricao: "Descubra os melhores produtos para o seu corpo.",
      urlPath: "corpo",
      produtos: limitProductsAndAddViewAll(corpoProducts, "Corpo", "corpo")
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
                  items={categoria.produtos}
                  loop={false}
                  autoplayDelay={undefined}
                  centeredSlides={false}
                  slidesPerView={1}
                  spaceBetween={10}
                  swiperClassName="w-full h-[520px] md:h-[520px]"
                  breakpoints={carrosselBreakpoints}
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
