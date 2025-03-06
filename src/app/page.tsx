import Carrossel from "./components/carrossel";

export default function Home() {
  // Carrossel de 1 produto por slide (novidades, por exemplo)
  const produtosSingle = [
    {
      id: 1,
      imageUrl: "https://i.imgur.com/3Nz4zHv.jpg",
      title: "Novidade 1",
      price: "",
      description: "Descrição da novidade 1",
      primeiroCarrossel: true,
    },
    {
      id: 2,
      imageUrl: "https://i.imgur.com/ROfFygP.jpg",
      title: "Novidade 2",
      price: "",
      description: "Descrição da novidade 2",
      primeiroCarrossel: true,
    },
    {
      id: 3,
      imageUrl: "https://i.imgur.com/ROfFygP.jpg",
      title: "Novidade 3",
      price: "",
      description: "Descrição da novidade 3",
      primeiroCarrossel: true,
    },
  ];

  // Carrossel com 6 produtos (card de produtos, com imagem, título, descrição)
  const produtosMulti = [
    {
      id: 1,
      imageUrl: "https://i.imgur.com/717KfcI.jpg",
      title: "Produto 1",
      price: "R$ 19,99",
      description: "Produto para cabelos com hidratação intensa.",
      primeiroCarrossel: false,
    },
    {
      id: 2,
      imageUrl: "https://i.imgur.com/BY92HYV.jpg",
      title: "Produto 2",
      price: "R$ 29,99",
      description: "Máscara capilar nutritiva.",
      primeiroCarrossel: false,
    },
    {
      id: 3,
      imageUrl: "https://i.imgur.com/HinCOlV.jpg",
      title: "Produto 3",
      price: "R$ 49,99",
      description: "Shampoo restaurador para cabelos danificados.",
      primeiroCarrossel: false,
    },
    {
      id: 4,
      imageUrl: "https://i.imgur.com/hnrxdMX.jpg",
      title: "Produto 4",
      price: "R$ 59,99",
      description: "Condicionador fortalecedor com queratina.",
      primeiroCarrossel: false,
    },
    {
      id: 5,
      imageUrl: "https://i.imgur.com/4eXQwip.jpg",
      title: "Produto 5",
      price: "R$ 69,99",
      description: "Óleo capilar nutritivo com argan.",
      primeiroCarrossel: false,
    },
    {
      id: 6,
      imageUrl: "https://i.imgur.com/6fs55eT.jpg",
      title: "Produto 6",
      price: "R$ 79,99",
      description: "Finalizador capilar antifrizz.",
      primeiroCarrossel: false,
    },
  ];

  return (
    <div>
      {/* Carrossel de novidades (1 imagem por slide) */}
      <Carrossel
        items={produtosSingle}
        slidesPerView={1}
        spaceBetween={0}
        autoplayDelay={4000}
        loop
        swiperClassName="w-full max-w-[1920px] mx-auto h-[400px] md:h-[400px] lg:h-[500px]"
      />

      {/* Título para o segundo carrossel */}
      <div className="mt-8 sm:mt-10 md:mt-14 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Cabelos
        </h2>
        <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base">
          Descubra os melhores produtos para cuidar dos seus cabelos.
        </p>
      </div>

      {/* Espaço entre os carrosséis */}
      <div className="mt-3 flex justify-center">
        {/* Container com borda, sombra e limite de largura */}
        <div className="border border-gray-300 shadow-lg p-8 w-full max-w-[1500px] mx-auto">
          <Carrossel
            items={produtosMulti}
            loop
            autoplayDelay={undefined}
            centeredSlides={true}
            slidesPerView={1}
            spaceBetween={10}
            swiperClassName="w-full h-[520px] md:h-[520px]"
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              375: {
                slidesPerView: 1.15,
                spaceBetween: 5,
              },
              425: {
                slidesPerView: 1.3,
                spaceBetween: 5,
              },
              640: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 10,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
