import { CarouselItem } from "@/interfaces/product";

export type SwiperBreakpoints = {
  [width: number]: {
    slidesPerView?: number;
    spaceBetween?: number;
  };
};

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

export interface CarouselImagesProps {
  imageUrl: string;
  backupImageUrl?: string;
  alt?: string;
}
