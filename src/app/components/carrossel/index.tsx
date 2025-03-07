"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "./styles.module.css";
import ProductCard from "../productCard";
import CarrosselImagens from "../carrosselimagens";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

// Define um tipo manual para breakpoints
type SwiperBreakpoints = {
  [width: number]: {
    slidesPerView?: number;
    spaceBetween?: number;
  };
};

interface CarouselItem {
  id: number | string;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  link?: string;
  primeiroCarrossel: boolean;
  category?: string;
  isViewAllSlide?: boolean;
  viewAllUrl?: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplayDelay?: number;
  loop?: boolean;
  navigationEnabled?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  swiperClassName?: string;
  breakpoints?: SwiperBreakpoints;
  centeredSlides?: boolean;
}

export default function Carrossel({
  items,
  autoplayDelay,
  loop = true,
  navigationEnabled = true,
  slidesPerView = 1,
  spaceBetween = 0,
  swiperClassName = "",
  breakpoints,
  centeredSlides,
}: CarouselProps) {
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(navigationEnabled);

  useEffect(() => {
    const updateNavigation = () => {
      setIsNavigationEnabled(window.innerWidth >= 768);
    };
    updateNavigation();
    window.addEventListener("resize", updateNavigation);
    return () => {
      window.removeEventListener("resize", updateNavigation);
    };
  }, []);

  // Componente "Ver Todos" para o slide final
  const ViewAllSlide = ({ category, viewAllUrl }: { category: string, viewAllUrl: string }) => {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white/80 p-8 rounded-2xl border-2 border-[#ff69b4]/20 hover:border-[#ff69b4]/40 transition-all duration-300">
        <h3 className="text-2xl font-bold text-[#ff69b4] mb-4">Ver Todos</h3>
        <p className="text-gray-600 text-center mb-8">
          Veja todos os produtos disponíveis na categoria <span className="font-semibold">{category}</span>
        </p>
        <Link
          href={viewAllUrl}
          className="px-6 py-3 bg-[#ff69b4] hover:bg-[#ff1493] text-white rounded-full flex items-center transition-colors duration-300"
        >
          Explorar Categoria <FiArrowRight className="ml-2" />
        </Link>
      </div>
    );
  };

  return (
    <div className={`relative mx-auto ${styles.paginationOverride}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={isNavigationEnabled}
        pagination={{
          clickable: true,
          renderBullet: (index, className) =>
            `<span class="${className} ${styles.customBullet}"></span>`,
        }}
        loop={loop}
        autoplay={autoplayDelay ? { 
          delay: autoplayDelay, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          waitForTransition: true
        } : false}
        slidesPerView={1}
        spaceBetween={spaceBetween}
        className={swiperClassName}
        breakpoints={breakpoints}
        centeredSlides={centeredSlides}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {item.isViewAllSlide ? (
              <ViewAllSlide category={item.category || ""} viewAllUrl={item.viewAllUrl || "#"} />
            ) : !item.primeiroCarrossel ? (
              <ProductCard
                id={typeof item.id === 'number' ? item.id : 0}
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                description={item.description}
                link={item.link}
                category={item.category}
              />
            ) : (
              <CarrosselImagens imageUrl={item.imageUrl} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
