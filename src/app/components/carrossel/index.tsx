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
  let filteredItems = items.filter((item) => {
    // If it's not a hero carousel item, include it regardless
    if (!item.primeiroCarrossel) return true;

    // For hero carousel items, filter based on isMobile flag
    return item.isMobile === isMobile;
  });

  // If we have only one item and loop is enabled, duplicate it to ensure looping works
  if (filteredItems.length === 1 && loop) {
    // Clone the item and assign a new id to ensure React doesn't complain about duplicate keys
    const clonedItem = {
      ...filteredItems[0],
      id: filteredItems[0].id + 100000,
    };
    filteredItems = [filteredItems[0], clonedItem];
  }

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
        loop={filteredItems.length > 1 && loop}
        speed={1000}
        loopAdditionalSlides={2}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        autoplay={
          autoplayDelay && filteredItems.length > 1
            ? {
                delay: autoplayDelay,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
                stopOnLastSlide: false,
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
