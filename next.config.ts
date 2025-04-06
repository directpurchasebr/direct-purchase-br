import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  /* config options here */
};

module.exports = {
  async rewrites() {
    return [
      
      {
        source: '/login/session',
        destination: '/api/auth/session',
      },
      {
        source: '/api/produto/listar',
        destination: 'http://localhost:1301/api/produto/listar',
      },
      {
        source: '/api/produto/buscar/',
        destination: 'http://localhost:1301/api/api/produto/buscar/',
      },
    ];
  },
};

export default nextConfig;
