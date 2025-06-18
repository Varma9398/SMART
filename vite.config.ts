import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine base path based on deployment environment
  const isVercel = process.env.VITE_VERCEL === 'true';
  const isProduction = process.env.NODE_ENV === 'production';
  
  const base = isVercel ? '/' : (isProduction ? '/SMART/' : '/SPP/');

  return {
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
    base,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  };
});
