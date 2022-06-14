import React, { Suspense } from 'react'
import type { PropsWithChildren } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { ThemeProvider } from '@context/ThemeContext'
import { AuthContextProvider } from '@context/AuthContext'
import { Loading } from '@components/Loading'

export function Providers({ children }: PropsWithChildren<{}>) {
  return (
    <Suspense fallback={<Loading />}>
      <AuthContextProvider>
        <ThemeProvider>
          <Router>{children}</Router>
        </ThemeProvider>
      </AuthContextProvider>
    </Suspense>
  )
}
