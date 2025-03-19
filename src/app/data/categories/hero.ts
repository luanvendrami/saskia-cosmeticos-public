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
    imageUrl: "/images/imagemDesktop1.jpg",
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
  {
    id: 3,
    imageUrl: "/images/imagemDesktop2.jpg",
    title: "Novidade 3",
    price: "",
    description: "Descrição da novidade 3",
    primeiroCarrossel: true,
    isMobile: false, // Desktop only
  },
  // Mobile-specific entries
  {
    id: 4,
    imageUrl: "/videos/video1.mp4",
    backupImageUrl: "/images/imagem2-hero.jpg", // Backup image if video fails
    title: "Vídeo Promocional",
    price: "",
    description: "Assista nosso vídeo promocional",
    primeiroCarrossel: true,
    isMobile: true, // Mobile only
  },
  {
    id: 5,
    imageUrl: "/images/imagem2-hero.jpg",
    title: "Novidade Mobile 2",
    price: "",
    description: "Descrição da novidade mobile 2",
    primeiroCarrossel: true,
    isMobile: true, // Mobile only
  },
  {
    id: 6,
    imageUrl: "/images/imagem3-hero.avif",
    title: "Novidade Mobile 3",
    price: "",
    description: "Descrição da novidade mobile 3",
    primeiroCarrossel: true,
    isMobile: true, // Mobile only
  },
];
