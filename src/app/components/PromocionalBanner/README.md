# Componente de Banner Promocional Futurista

Este componente exibe um banner promocional com estilo futurista e cyberpunk, usando elementos SVG animados, efeitos de glassmorphism e iluminação neon.

## Características

- Design futurista com gradientes vibrantes e efeito de vidro
- SVGs de alta qualidade de produtos de maquiagem
- Elementos animados com efeitos de pulsação, flutuação e brilho
- Código promocional com efeitos neon e hover interativo
- Partículas animadas e linhas decorativas em movimento

## Uso

O componente pode ser importado e usado em qualquer página:

```jsx
import PromocionalBanner from "@/app/components/PromocionalBanner";

// Em um componente ou página
<PromocionalBanner />
```

## Estrutura do Componente

O banner consiste em:
1. **Fundo futurista**: Gradientes com círculos de blur e grid estilizado
2. **Container principal**: Painel com efeito de vidro (glassmorphism) e borda luminosa
3. **SVGs estilizados**: Ilustrações vetoriais integradas diretamente no componente
4. **Elementos decorativos**: Partículas, linhas e efeitos geométricos
5. **Conteúdo promocional**: Exibe o código "CYBER10" com 10% de desconto para pagamentos via PIX

## Elementos Visuais

### SVGs Integrados
O componente inclui os seguintes SVGs integrados diretamente no código:

- **Batom**: Desenho vetorial com gradiente rosa
- **Paleta de sombras**: Ilustração com diferentes cores de maquiagem
- **Perfume**: Frasco estilizado com efeito gradiente azul
- **Pincel de maquiagem**: Desenho detalhado com cabo de madeira e ponta rosa

### Efeitos Especiais
- **Glassmorphism**: Efeito de vidro translúcido com blur
- **Partículas animadas**: Pequenos elementos que pulsam e brilham
- **Linhas decorativas**: Efeitos geométricos com gradientes coloridos
- **Brilhos neon**: Sombras e bordas luminosas em elementos chave

## Animações

Todas as animações utilizadas no banner são definidas no arquivo `tailwind.config.ts`. Os elementos possuem diversos efeitos:

- **float/float-slow**: Flutuação suave para os elementos principais
- **ping-slow/ping-delay/ping-fast**: Efeitos de pulsação para partículas
- **shimmer**: Efeito de brilho que percorre o fundo
- **pulse-text**: Sutis pulsações de opacidade no texto
- **bounce-subtle**: Movimento sutil de setas indicativas

## Personalização

Para personalizar o banner:

1. **Alterar o código promocional**: Modifique o texto "CYBER10" no JSX
2. **Mudar cores**: Edite os gradientes e valores de cores nas classes Tailwind
3. **Ajustar SVGs**: Modifique os SVGs diretamente no código ou substitua por outros desenhos
4. **Modificar animações**: Ajuste os tempos e efeitos no arquivo tailwind.config.ts
5. **Adicionar elementos**: Inclua mais elementos decorativos ou informativos conforme necessário 