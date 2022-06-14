import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '../../context/theme'

import type { PropsWithChildren } from 'react'
function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider>
      <Router>{children}</Router>
    </ThemeProvider>
  )
}

export default Providers
