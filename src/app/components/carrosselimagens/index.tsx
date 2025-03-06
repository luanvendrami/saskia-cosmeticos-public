import Image from "next/image";

interface CarrosselImagensProps {
  imageUrl: string;
  alt?: string;
}

export default function CarrosselImagens({
  imageUrl,
  alt = "Imagem de novidade",
}: CarrosselImagensProps) {
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
