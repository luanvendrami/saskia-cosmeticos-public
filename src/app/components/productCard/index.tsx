import Image from "next/image";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  link?: string;
  price?: string;
}

export default function ProductCard({
  imageUrl,
  title,
  description,
  link,
  price,
}: ProductCardProps) {
  return (
    <div className="group relative w-[260px] bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-105">
      {/* Imagem com proporção 3:4 */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-90"
        />
      </div>

      <div className="p-4 h-[135px] flex flex-col justify-between">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
          <p className="text-sm text-gray-600 mt-1 mb-2 line-clamp-2">
            {description}
          </p>
        </div>
        {price && <p className="text-base font-bold text-indigo-600">{price}</p>}
      </div>

      {link && (
        <a
          href={link}
          className="absolute inset-0" // Faz com que o card inteiro seja clicável
          aria-label={title}
        ></a>
      )}
    </div>
  );
}