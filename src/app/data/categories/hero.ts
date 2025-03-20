export interface HeroProduct {
  id: number;
  imageUrl: string;
  backupImageUrl?: string; // Optional backup image URL for videos
  title: string;
  price: string;
  description: string;
  primeiroCarrossel: boolean;
  isMobile: boolean; // Flag to determine if this item should appear on mobile devices
}

export const heroProducts: HeroProduct[] = [
  {
    id: 1,
    imageUrl: "/images/banner1.png",
    title: "Novidade 1",
    price: "",
    description: "Descrição da novidade 1",
    primeiroCarrossel: true,
    isMobile: false, // Desktop only
  },
  {
    id: 2,
    imageUrl: "/images/imagemDesktop1.jpg",
    title: "Novidade 2",
    price: "",
    description: "Descrição da novidade 2",
    primeiroCarrossel: true,
    isMobile: false, // Desktop only
  },
  // Mobile-specific entries
  {
    id: 4,
    imageUrl: "/videos/video1.mp4",
    backupImageUrl: "/images/imagem2-hero.jpg", // Backup image if video fails
    title: "",
    price: "",
    description: "",
    primeiroCarrossel: true,
    isMobile: true, // Mobile only
  },
  {
    id: 5,
    imageUrl: "/videos/video2.mp4",
    title: "",
    price: "",
    description: "",
    primeiroCarrossel: true,
    isMobile: true, // Mobile only
  },
  {
    id: 6,
    imageUrl: "/videos/video3.mp4",
    title: "",
    price: "",
    description: "",
    primeiroCarrossel: true,
    isMobile: true, // Mobile only
  },
];
