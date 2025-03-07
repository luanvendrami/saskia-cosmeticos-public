export interface Product {
  id: number;
  imageUrl: string;
  title: string;
  price: string;
  description: string;
  primeiroCarrossel: boolean;
  category: string;
}

export const cabelosProducts: Product[] = [
  {
    id: 101,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Shampoo Revitalizante",
    price: "R$ 29,90",
    description: "Shampoo para cabelos danificados com fórmula nutritiva e reparadora.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 102, 
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Condicionador Hidratante",
    price: "R$ 27,90",
    description: "Condicionador para todos os tipos de cabelo com hidratação profunda.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 103,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Máscara Capilar",
    price: "R$ 35,90",
    description: "Máscara de tratamento intensivo para cabelos ressecados e quebradiços.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 104,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Óleo de Argan",
    price: "R$ 45,90",
    description: "Óleo nutritivo com argan para cabelos danificados, proporciona brilho e maciez.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 105,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Leave-in",
    price: "R$ 32,90",
    description: "Creme sem enxágue para proteger e hidratar os fios durante o dia.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 106,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Ampola de Reconstrução",
    price: "R$ 19,90",
    description: "Ampola de tratamento intensivo para reconstrução capilar instantânea.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 107,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Protetor Térmico",
    price: "R$ 36,90",
    description: "Protetor para uso antes de secador e chapinha, evita danos causados pelo calor.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 108,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Finalizador de Cachos",
    price: "R$ 39,90",
    description: "Creme para definição de cachos com controle de frizz e hidratação.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 109,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Spray Volumador",
    price: "R$ 41,90",
    description: "Spray para dar volume aos cabelos finos e sem vida.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
  {
    id: 110,
    imageUrl: "/images/6fs55eT.jpeg", 
    title: "Tônico Capilar",
    price: "R$ 48,90",
    description: "Tônico para o couro cabeludo, estimula o crescimento dos fios.",
    primeiroCarrossel: false,
    category: "Cabelos",
  },
]; 