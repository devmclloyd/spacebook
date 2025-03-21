
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'

// Using dynamic import for ESM module
const loadComponentTagger = async () => {
  try {
    const { componentTagger } = await import('lovable-tagger')
    return componentTagger
  } catch (error) {
    console.error('Failed to load componentTagger:', error)
    return null
  }
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: ConfigEnv): Promise<UserConfig> => {
  // Dynamically import componentTagger
  const tagger = mode === 'development' ? await loadComponentTagger() : null
  
  return {
    plugins: [
      react(),
      mode === 'development' && tagger,
    ].filter(Boolean) as any,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      sourcemap: true,
      outDir: 'dist',
      // Explicitly tell Vite to skip TypeScript checks during build
      rollupOptions: {
        external: [],
      }
    },
    server: {
      host: "::",
      port: 8080
    },
    // Override TypeScript configuration for Vite
    optimizeDeps: {
      esbuildOptions: {
        tsconfigRaw: {
          compilerOptions: {
            // Ensure these settings don't conflict with tsconfig.node.json
            target: 'es2020',
            useDefineForClassFields: true,
            module: 'ESNext',
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
