/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Temporarily ignore ESLint errors during build
  eslint: {
    // Temporarily ignore errors during builds
    ignoreDuringBuilds: true,
    // Verifica todos os arquivos no diretório src
    dirs: ['src/'],
  },
  typescript: {
    // Nunca ignora erros de TypeScript durante builds
    ignoreBuildErrors: false,
  },
  // Falha rápida em caso de erros
  onDemandEntries: {
    // Período em ms onde o servidor irá manter páginas no buffer
    maxInactiveAge: 25 * 1000,
    // Número de páginas que devem ser mantidas simultaneamente sem serem descartadas
    pagesBufferLength: 2,
  },
  // Configuração de webpack para melhorar detecção de erros
  webpack: (config, { dev, isServer }) => {
    // We'll skip the eslint-loader as we're using the ESLint integration in Next.js
    
    return config;
  },
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "placehold.co"],
  },
  async rewrites() {
    return [
      {
        source: '/cabelos',
        destination: '/feature/pages/cabelos',
      },
      {
        source: '/corpo',
        destination: '/feature/pages/corpo',
      },
      {
        source: '/maquiagem',
        destination: '/feature/pages/maquiagem',
      },
      {
        source: '/perfumes',
        destination: '/feature/pages/perfumes',
      },
      {
        source: '/skincare',
        destination: '/feature/pages/skincare',
      },
    ];
  },
}

module.exports = nextConfig 