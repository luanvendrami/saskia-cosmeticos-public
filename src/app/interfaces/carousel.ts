/**
 * @fileoverview Carousel-related interfaces for the application
 */

import { CarouselItem } from "./product";

/**
 * Type definition for Swiper breakpoints
 * Used to define responsive behavior of the carousel
 */
export type SwiperBreakpoints = {
  [width: number]: {
    slidesPerView?: number;
    spaceBetween?: number;
  };
};

/**
 * Interface for Carousel component properties
 */
export interface CarouselProps {
  items: CarouselItem[];
  autoplayDelay?: number;
  loop?: boolean;
  navigationEnabled?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  swiperClassName?: string;
  breakpoints?: SwiperBreakpoints;
  centeredSlides?: boolean;
  renderItem?: (item: CarouselItem, isMobile: boolean) => React.ReactNode;
}

/**
 * Interface for CarouselImages component properties
 */
export interface CarouselImagesProps {
  imageUrl: string;
  backupImageUrl?: string;
  alt?: string;
}
