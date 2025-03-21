
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { componentTagger } from "lovable-tagger"

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: true,
      outDir: 'dist',
      rollupOptions: {
        external: [],
      }
    },
    server: {
      host: "::",
      port: 8080
    },
    optimizeDeps: {
      esbuildOptions: {
        tsconfigRaw: {
          compilerOptions: {
            target: 'es2020',
            useDefineForClassFields: true,
            skipLibCheck: true,
            moduleResolution: 'bundler',
            allowImportingTsExtensions: true,
            resolveJsonModule: true,
            isolatedModules: true,
            noEmit: true,
            jsx: 'react-jsx',
            strict: true,
            noUnusedLocals: true,
            noUnusedParameters: true,
            noFallthroughCasesInSwitch: true
          }
        }
      }
    }
  }
})
