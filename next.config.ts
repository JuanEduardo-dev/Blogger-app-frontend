import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Configuración de caché en memoria
    config.cache = {
      type: "memory", // Usar caché en memoria para mejorar la velocidad en desarrollo
    };

    // Asegúrate de retornar la configuración de Webpack modificada.
    return config;
  },
};

export default nextConfig;
