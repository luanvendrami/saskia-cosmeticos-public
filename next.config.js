/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuração rigorosa de ESLint para desenvolvimento
  eslint: {
    // Nunca ignora erros de ESLint durante builds
    ignoreDuringBuilds: false,
    // Verifica todos os arquivos no diretório src
    dirs: ['src/'],
    // Força a verificação de ESLint em cada build
    lintDuringBuild: true
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
    // Adiciona regras mais rigorosas apenas em desenvolvimento
    if (dev) {
      config.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: ['eslint-loader'],
      });
    }
    
    return config;
  },
}

module.exports = nextConfig 