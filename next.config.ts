import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: false
    }
  ],
  reactStrictMode: true, // Activa el modo estricto de React
  swcMinify: true,       // Habilita la minificación con SWC
  experimental: {      // Asegúrate de que la carpeta "app" esté habilitada
  },
};

export default nextConfig;