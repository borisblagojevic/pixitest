import { defineConfig } from 'vite';

export default defineConfig({
    base: '',
    server: {
        proxy: {
            '/api': {
                target: 'https://localhost',
                changeOrigin: true,
            },
        },
    },
    plugins: [],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'main-bundle.js',
                chunkFileNames: 'assets/[name]-[hash].js',
                assetFileNames: 'assets/[name]-[hash].[ext]',
            },
        },
    },
});