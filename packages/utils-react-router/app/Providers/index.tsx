import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '../Theme'

import type { PropsWithChildren } from 'react'
import { AuthContextProvider } from './useAuth'

import Box from '@mui/material/Box'

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Router>{children}</Router>
      </ThemeProvider>
    </AuthContextProvider>
  )
}
