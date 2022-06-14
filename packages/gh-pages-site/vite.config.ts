import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import reactRefresh from '@vitejs/plugin-react-refresh'
// @ts-expect-error This doesn't know we're server-side
import path from 'path'

// @ts-expect-error This doesn't know we're server-side
const ref = (pkg: string) => path.join(__dirname, `../${pkg}/lib`)

// packages we want to dynamically link to rather than having to build
// them beforehand
const pkgs = Object.fromEntries(
  [
    'pattern-app-shell',
    'pattern-sidebar-navigation',
    'pattern-utils',
    'shared-frontend',
    'utils-react-router',
  ].map(x => [`design-system/${x}`, ref(x)]),
)

export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths()],
  resolve: {
    alias: pkgs,
  },
  build: {
    outDir: '../../pages',
  },
})
