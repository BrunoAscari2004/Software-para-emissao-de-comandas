import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

export default defineConfig(({ mode }) => ({
    root: './src/main/webapp',
    publicDir: './src/main/webapp/app/shared/assets',
    base: mode === 'development' ? '' : '/BGJMComandas',
    build: {
        // Relative to the root
        outDir: '../../../target/dist',
        rollupOptions: {
            output: {
                manualChunks: id => {
                    if (id.includes('node_modules')) {
                        if (id.includes('apexcharts')) {
                            return 'vendor_apexcharts';
                        } else if (id.includes('@mui')) {
                            return 'vendor_mui';
                        } else if (id.includes('react-icons')) {
                            return 'vendor_ricons';
                        }
                        return 'vendor'; // all other package goes here
                    }
                },
            },
        },
    },
    plugins: [
        // …
        react({
            // Only include TSX files
            include: './src/main/webapp/**/*.tsx',
        }),
        mode === 'development'
            ? nodePolyfills({
                  // Whether to polyfill `node:` protocol imports.
                  protocolImports: true,
              })
            : undefined,
    ],
    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, 'src', 'main', 'webapp', 'app', 'pages'),
            '@routes': path.resolve(__dirname, 'src', 'main', 'webapp', 'app', 'routes'),
            '@shared': path.resolve(__dirname, 'src', 'main', 'webapp', 'app', 'shared'),
        },
    },
    server: {
        port: 3000,
        proxy:
            mode === 'development'
                ? {
                      '/BGJMComandas/api/': {
                          target: 'http://127.0.0.1:8080/',
                          secure: false,
                          changeOrigin: true,
                      },
                      '/BGJMComandas/helps/': {
                          target: 'http://127.0.0.1:8080/',
                          secure: false,
                          changeOrigin: true,
                      },
                      '/BGJMComandas/ws/': {
                          target: 'http://127.0.0.1:8080/',
                          secure: false,
                          ws: true,
                      },
                  }
                : undefined,
    },
}));
