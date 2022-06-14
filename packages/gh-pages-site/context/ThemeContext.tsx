import React, { createContext, useCallback, useEffect, useState } from 'react'
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material'
import { createTheme } from 'design-system/shared-frontend'
import type { Theme } from '@mui/material'

import { Link } from '@components/Link'

export interface IThemeContext {
  type: 'light' | 'dark'
  toggle: () => void
}

const defaultType = (): 'light' | 'dark' => {
  let type = localStorage.getItem('theme-type')
  if (!type || (type !== 'light' && type !== 'dark')) {
    type = 'light'
    localStorage.setItem('theme-type', type)
  }
  return type as 'light' | 'dark'
}

export const ThemeContext = createContext<IThemeContext>({
  type: defaultType(),
  toggle: () => undefined,
})

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const [theme, setThemeType] = useState<'dark' | 'light'>(defaultType())
  const [muiTheme, setMuiTheme] = useState<Theme>(makeNewTheme(theme))

  useEffect(() => {
    if (theme === muiTheme.palette.mode) return
    setMuiTheme(makeNewTheme(theme))
  }, [theme])

  const setLocalStorage = useCallback((type: 'light' | 'dark') => {
    localStorage.setItem('theme-type', type)
  }, [])

  const toggle = useCallback(() => {
    const newType = theme !== 'dark' ? 'dark' : 'light'
    setLocalStorage(newType)
    setThemeType(newType)
  }, [setLocalStorage, setThemeType, theme])

  return (
    <ThemeContext.Provider value={{ type: theme, toggle }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

const makeNewTheme = (mode: 'dark' | 'light') => {
  const base = createTheme({ palette: { mode } })
  if (base.components?.MuiButton?.defaultProps) {
    base.components.MuiButton.defaultProps = {
      ...base.components?.MuiButton?.defaultProps,
      LinkComponent: Link,
    }
  }

  return base
}
