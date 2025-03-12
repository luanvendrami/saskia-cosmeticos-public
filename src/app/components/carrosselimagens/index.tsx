import Image from "next/image";
import { CarouselImagesProps } from "../../interfaces/carousel";

export default function CarrosselImagens({
  imageUrl,
  alt = "Imagem de novidade",
}: CarouselImagesProps) {
  return (
    <div className="relative w-full h-full">
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
