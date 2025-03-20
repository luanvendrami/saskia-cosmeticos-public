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
import { CarouselProps } from "../../interfaces/carousel";

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
  const [isNavigationEnabled, setIsNavigationEnabled] =
    useState(navigationEnabled);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateScreenState = () => {
      const width = window.innerWidth;
      const isMobileScreen = width < 768;
      setIsMobile(isMobileScreen);
      setIsNavigationEnabled(navigationEnabled && width >= 768);
    };

    updateScreenState();
    window.addEventListener("resize", updateScreenState);
    return () => {
      window.removeEventListener("resize", updateScreenState);
    };
  }, [navigationEnabled]);

  // If we're not on the client yet, return a placeholder
  if (!isClient) {
    return (
      <div
        className={`relative mx-auto ${styles.paginationOverride} min-h-[300px] bg-gray-100`}
      ></div>
    );
  }

  // Filter items based on device type
  const filteredItems = items.filter((item) => {
    // If it's not a hero carousel item, include it regardless
    if (!item.primeiroCarrossel) return true;

    // For hero carousel items, filter based on isMobile flag
    return item.isMobile === isMobile;
  });

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
        autoplay={
          autoplayDelay
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                waitForTransition: true,
              }
            : false
        }
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        className={swiperClassName}
        breakpoints={breakpoints}
        centeredSlides={centeredSlides}
      >
        {filteredItems.map((item) => (
          <SwiperSlide key={item.id}>
            {!item.primeiroCarrossel ? (
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
            ) : (
              <CarrosselImagens
                imageUrl={item.imageUrl}
                backupImageUrl={item.backupImageUrl}
                alt={item.title}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
