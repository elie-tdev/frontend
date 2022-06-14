import fs from 'fs-extra'
import path from 'path'
import { defineConfig } from 'vite'

import reactRefresh from '@vitejs/plugin-react-refresh'

const {
  dependencies = {},
  peerDependencies = {},
  devDependencies = {},
} = fs.readJsonSync(path.join(process.cwd(), 'package.json'))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.tsx'),
      name: 'sharedlib',
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into the library, but only when we're not publishing internal packages
      external: [
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
        ...Object.keys(peerDependencies),
      ],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          '@mui/material': 'MaterialUI',
          '@mui/styles': 'MuiStyles',
          '@mui/system': 'MuiSystem',
          '@mui/types': 'MuiTypes',
          '@mui/utils': 'MuiUtils',
        },
      },
    },
  },
})
