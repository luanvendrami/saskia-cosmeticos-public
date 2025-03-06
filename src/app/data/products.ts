export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    category: string;
    promocao: boolean;
    benefits?: string;
  }

  export const products: Product[] = [
  {
    id: 1,
    name: "Tônico Adstringente",
    price: 17.9,
    image: "https://i.imgur.com/U5qjiiJ.jpg",
    description: "Tônico Adstringente 10 in 1 - 200ml",
    category: "skincare",
    promocao: true,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 2,
    name: "Água Micelar",
    price: 24.9,
    image: "https://i.imgur.com/3Nz4zHv.jpg",
    description: "Água Micelar 10 em 1 para limpeza facial - 250ml",
    category: "skincare",
    promocao: true,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 3,
    name: "Água Micelar Lovely Face Beautiful",
    price: 19.9,
    image: "https://i.imgur.com/ROfFygP.jpg",
    description:
      "Água Micelar 10 em 1 com Camomila, Aloe Vera e Rosa Mosqueta - Edição Limitada - 200ml",
    category: "skincare",
    promocao: true,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 4,
    name: "Água Micelar Dermachem",
    price: 19.9,
    image: "https://i.imgur.com/717KfcI.jpg",
    description: "Água Micelar 10 in 1 - 200ml",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 5,
    name: "Cleansing Oil Ruby Skin",
    price: 39.9,
    image: "https://i.imgur.com/BY92HYV.jpg",
    description:
      "Óleo de Limpeza Facial com Óleo de Semente de Uva, Abacate e Vitamina E - 200ml",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 6,
    name: "Sabonete Facial Vitamina C",
    price: 18.9,
    image: "https://i.imgur.com/HinCOlV.jpg",
    description:
      "Sabonete Facial com Vitamina C pura, Ácido Hialurônico e Niacinamida",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 7,
    name: "Sabonete Rosa Mosqueta",
    price: 18.9,
    image: "https://i.imgur.com/hnrxdMX.jpg",
    description: "Sabonete Facial com Ácido Hialurônico e Vitamina E",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 8,
    name: "Sabonete Ácido Salicílico",
    price: 19.9,
    image: "https://i.imgur.com/4eXQwip.jpg",
    description: "Sabonete Facial Controle de Oleosidade",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 9,
    name: "Demaquilante",
    price: 29.9,
    image: "https://i.imgur.com/sHteGM4.jpg",
    description: "Demaquilante OMNA",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 10,
    name: "Sérum Rosa Mosqueta",
    price: 27.9,
    image: "https://i.imgur.com/J9lrGfB.jpg",
    description:
      "Brilho, renovação, hidratação, clareamento e uniformização da pele",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 11,
    name: "Sérum Anti Olheiras",
    price: 27.9,
    image: "https://i.imgur.com/6fs55eT.jpg",
    description: "Reduz inchaço, clareia e hidrata",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 12,
    name: "Sérum Ácido Hialurônico",
    price: 33.9,
    image: "https://i.imgur.com/4iWMOho.jpg",
    description: "Sérum Hidratante",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 13,
    name: "Sérum Efeito Secativo",
    price: 27.9,
    image: "https://i.imgur.com/4E2X5Yc.jpg",
    description: "Controla a oleosidade, reduz cravos, espinhas e acne",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 14,
    name: "Sérum Melasma",
    price: 27.9,
    image: "https://i.imgur.com/3bPLhoE.jpg",
    description: "Uniformiza o tom da pele, efeito clareador",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 15,
    name: "Creme facial Hidratação e Nutrição",
    price: 44.9,
    image: "https://i.imgur.com/UiuCY4j.jpg",
    description: "Reaparação dos tecidos e formação de colágeno",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 16,
    name: "Esfoliante Facial",
    price: 14.9,
    image: "https://i.imgur.com/zXzCMpR.jpg",
    description: "Sérum de Niacinamida 10% para Controle da Oleosidade - 30ml",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 17,
    name: "Esfoliante Facial",
    price: 14.9,
    image: "https://i.imgur.com/h4NblO9.jpg",
    description: "Esfoliante Facial com ácido hialurônico e Aloe Vera",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 18,
    name: "Booster Vitamina C",
    price: 99.9,
    image: "https://i.imgur.com/IGvFWjB.jpg",
    description: "Sérum Facial Clareador",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 19,
    name: "Sérum Facial Anti Olheiras",
    price: 19.9,
    image: "https://i.imgur.com/gd8b0Jc.jpg",
    description: "Sérum facial anti olheiras",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 20,
    name: "Sérum Vitamina C",
    price: 19.9,
    image: "https://i.imgur.com/Ar7mfeA.jpg",
    description: "Sérum Facial Vitamina C",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 21,
    name: "Sérum Lifting",
    price: 89.9,
    image: "https://i.imgur.com/YsW74PU.jpg",
    description: "Sérum área dos olhos efeito lifting",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 22,
    name: "Creme Hidratante Facial",
    price: 23.9,
    image: "https://i.imgur.com/CQOyxRf.jpg",
    description: "Creme Facial Hidratante com leite de arroz",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 23,
    name: "Hidratante Oil Control",
    price: 39.9,
    image: "https://i.imgur.com/eJzE2bs.jpg",
    description: "Gel Creme Hidratante Controle de oleosidade",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 24,
    name: "Primer",
    price: 24.9,
    image: "https://i.imgur.com/qH2dhqp.jpg",
    description: "Primer Facial",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 25,
    name: "Hidratante Noturno Intensivo",
    price: 39.9,
    image: "https://i.imgur.com/9tAhXHu.jpg",
    description: "Hidratante Facial Noturno",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 26,
    name: "Sabonete Facial Vitamina C",
    price: 31.9,
    image: "https://i.imgur.com/2mrpzml.jpg",
    description: "Sabonete Facial Vitamina C",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 27,
    name: "Creme firmador com FPS 60",
    price: 69.9,
    image: "https://i.imgur.com/wV2bf3C.jpg",
    description: "Creme facial firmador Antissinais com FPS 60",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 28,
    name: "Creme facial firmador com FPS",
    price: 69.9,
    image: "https://i.imgur.com/Km1Hc3T.jpg",
    description: "Creme facial firmador Firmeza com FPS 60",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 29,
    name: "Iluminador corpo e rosto",
    price: 69.9,
    image: "https://i.imgur.com/FT3f9HT.jpg",
    description: "Iluminador corpo e rosto",
    category: "skincare",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 30,
    name: "Base Catherine Hill",
    price: 62.9,
    image: "https://i.imgur.com/V9vw6cB.jpg",
    description: "Base Alta Cobertura à prova d'água N4",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 31,
    name: "Base Catherine Hill",
    price: 62.9,
    image: "https://i.imgur.com/M4B4ybV.jpg",
    description: "Base Alta Cobertura à prova d'água N3",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 32,
    name: "Base Febella",
    price: 21.9,
    image: "https://i.imgur.com/EVD1L2v.jpg",
    description: "Base líquida de alta cobertura efeito matte N4",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 33,
    name: "Base Catherine Hill",
    price: 62.9,
    image: "https://i.imgur.com/nUn2oDR.jpg",
    description: "Base Alta Cobertura à prova d'água N1",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 34,
    name: "Base Febella",
    price: 21.9,
    image: "https://i.imgur.com/B6AK4dT.jpg",
    description: "Base líquida de alta cobertura efeito matte N2",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 35,
    name: "Base Febella",
    price: 21.9,
    image: "https://i.imgur.com/UCRCAf1.jpg",
    description: "Base líquida de alta cobertura efeito matte N5",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 36,
    name: "Base Febella",
    price: 21.9,
    image: "https://i.imgur.com/dF4JuPe.jpg",
    description: "Base líquida de alta cobertura efeito matte N1",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 37,
    name: "Base Febella",
    price: 21.9,
    image: "https://i.imgur.com/qs4ZpJk.jpg",
    description: "Base líquida de alta cobertura efeito matte N2",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 38,
    name: "Base Angel",
    price: 62.9,
    image: "https://i.imgur.com/59hqiEI.jpg",
    description: "Base resistente à água, média cobertura N3",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 39,
    name: "Base Angel",
    price: 62.9,
    image: "https://i.imgur.com/inVyFi4.jpg",
    description: "Base resistente à água, média cobertura N2",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 40,
    name: "Base Angel",
    price: 62.9,
    image: "https://i.imgur.com/Wok2cUS.jpg",
    description: "Base resistente à água, média cobertura N4",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 41,
    name: "Base Payot",
    price: 49.9,
    image: "https://i.imgur.com/cr1DdHr.jpg",
    description: "Base Matte N4",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 42,
    name: "Base Angel",
    price: 62.9,
    image: "https://i.imgur.com/zYYZ8TI.jpg",
    description: "Base resistente à água, média cobertura N1",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 43,
    name: "Base Payot",
    price: 49.9,
    image: "https://i.imgur.com/T0lyXz4.jpg",
    description: "Base matte N3",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 44,
    name: "Corretivo Febella ",
    price: 28.9,
    image: "https://i.imgur.com/sxdhydY.jpg",
    description: "Corretivo média cobertura N6",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 45,
    name: "Corretivo Febella",
    price: 28.9,
    image: "https://i.imgur.com/MDiCXKq.jpg",
    description: "Corretivo média cobertura N5",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 46,
    name: "Corretivo Febella",
    price: 28.9,
    image: "https://i.imgur.com/jKLAxMY.jpg",
    description: "Corretivo média cobertura N4",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 47,
    name: "Corretivo Febella",
    price: 28.9,
    image: "https://i.imgur.com/XP9VbjP.jpg",
    description: "Corretivo média cobertura N3",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 48,
    name: "Corretivo Febella",
    price: 28.9,
    image: "https://i.imgur.com/dbrKMqI.jpg",
    description: "Corretivo média cobertura N2",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 49,
    name: "Corretivo Febella",
    price: 28.9,
    image: "https://i.imgur.com/Tcku17J.jpg",
    description: "Corretivo média cobertura N1",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 50,
    name: "Corretivo Angel",
    price: 58.9,
    image: "https://i.imgur.com/BSKHgYP.jpg",
    description: "Camuflagem Catherine Hill A3",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 51,
    name: "Corretivo Febella",
    price: 28.9,
    image: "https://i.imgur.com/JZtXPgM.jpg",
    description: "Corretivo média cobertura N1",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 52,
    name: "Corretivo Mood",
    price: 28.9,
    image: "https://i.imgur.com/87i55uO.jpg",
    description: "Corretivo média cobertura RubyRose N0",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 53,
    name: "Corretivo Angel",
    price: 58.9,
    image: "https://i.imgur.com/16PXUUI.jpg",
    description: "Camuflagem Catherine Hill A2",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 54,
    name: "Corretivo Catherine Hill",
    price: 39.9,
    image: "https://i.imgur.com/3WQAPo2.jpg",
    description: "Corretivo Natural à prova d'água N4",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 55,
    name: "Corretivo Catherine Hill",
    price: 39.9,
    image: "https://i.imgur.com/CrfgZQN.jpg",
    description: "Corretivo Natural leve à prova d'água N2",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 56,
    name: "Corretivo Mood",
    price: 28.9,
    image: "https://i.imgur.com/zlEO2g6.jpg",
    description: "Corretivo média cobertura RubyRose N050",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 57,
    name: "Corretivo Payot",
    price: 39.9,
    image: "https://i.imgur.com/3Yzvgdz.jpg",
    description: "Corretivo matte alta cobertura N2",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 58,
    name: "Sérum cílios e sobrancelhas",
    price: 19.9,
    image: "https://i.imgur.com/sRc8ubw.jpg",
    description:
      "Sérum com vitamina E que ajuda na hidratação e crescimento dos cílios e sobrancelhas",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 59,
    name: "Máscara de cílios Max 4D",
    price: 24.9,
    image: "https://i.imgur.com/em1wLB5.jpg",
    description: "Máscara de cílios Ultra volume e definição 4D",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 60,
    name: "Máscara de cílios",
    price: 21.9,
    image: "https://i.imgur.com/Ln01Zbr.jpg",
    description: "Máscara de cílios à prova d'água Colossal",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 61,
    name: "Blindagem Vivai",
    price: 27.9,
    image: "https://i.imgur.com/VVAOvUw.jpg",
    description: "Primer, fixador e diluidor",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 62,
    name: "Bruma Max Love",
    price: 17.9,
    image: "https://i.imgur.com/oZV5CMR.jpg",
    description: "Bruma com ácido hialurônico",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 63,
    name: "Bruma matte",
    price: 16.9,
    image: "https://i.imgur.com/f8n6Cfp.jpg",
    description: "Efeito matte, fixa, hidrata e tonifica",
    category: "maquiagem",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 64,
    name: "Jelly Tint N3",
    price: 26.9,
    image: "https://imgur.com/Qh6xTBg.jpg",
    description: "Tint e Blush",
    category: "cabelo",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 65,
    name: "Jelly Tint N2",
    price: 26.9,
    image: "https://imgur.com/21T7Qrv.jpg",
    description: "Tint e Blush",
    category: "cabelo",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 66,
    name: "Jelly Tint N1",
    price: 26.9,
    image: "https://imgur.com/N9MQZcy.jpg",
    description: "Tint e Blush",
    category: "cabelo",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
  {
    id: 67,
    name: "Jelly Tint N4",
    price: 26.9,
    image: "https://imgur.com/29gzhfo.jpg",
    description: "Tint e Blush",
    category: "cabelo",
    promocao: false,
    benefits: "beneficio 1 | beneficio 2 | beneficio3"
  },
];
