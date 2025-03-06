"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "./styles.module.css";
import ProductCard from "../productCard";// Certifique-se de que esse componente existe
import CarrosselImagens from "../carrosselimagens";

// Define um tipo manual para breakpoints
type SwiperBreakpoints = {
  [width: number]: {
    slidesPerView?: number;
    spaceBetween?: number;
    // Adicione outras props que você use (ex.: loop, navigation, etc.)
  };
};

interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  link?: string;
  primeiroCarrossel: boolean;
}

interface CarouselProps {
  items: CarouselItem[];
  autoplayDelay?: number;
  loop?: boolean;
  navigationEnabled?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  swiperClassName?: string;
  breakpoints?: SwiperBreakpoints; // Aqui usamos nosso tipo manual
  centeredSlides?: boolean;
}

export default function Carrossel({
  items,
  autoplayDelay, // Agora aceita undefined para desativar
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
        autoplay={autoplayDelay ? { delay: autoplayDelay, disableOnInteraction: false } : false}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        className={swiperClassName}
        breakpoints={breakpoints}
        centeredSlides={centeredSlides}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {!item.primeiroCarrossel ? (
              <ProductCard
                imageUrl={item.imageUrl}
                title={item.title}
                price={item.price}
                description={item.description}
                link={item.link}
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
