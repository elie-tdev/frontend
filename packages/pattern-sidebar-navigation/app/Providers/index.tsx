import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '../Theme'

import type { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <ThemeProvider>
      <Router>{children}</Router>
    </ThemeProvider>
  )
}
