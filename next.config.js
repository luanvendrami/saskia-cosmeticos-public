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
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com", "placehold.co"],
  },
  async redirects() {
    return [
      {
        source: '/cabelos',
        destination: '/features/cabelos',
        permanent: true,
      },
      {
        source: '/corpo',
        destination: '/features/corpo',
        permanent: true,
      },
      {
        source: '/maquiagem',
        destination: '/features/maquiagem',
        permanent: true,
      },
      {
        source: '/perfumes',
        destination: '/features/perfumes',
        permanent: true,
      },
      {
        source: '/skincare',
        destination: '/features/skincare',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig 