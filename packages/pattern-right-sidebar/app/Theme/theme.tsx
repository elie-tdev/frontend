import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import MuiThemeProvider from '@mui/material/styles/ThemeProvider'
import { createTheme } from 'design-system/shared-frontend'

import type { Theme } from '@mui/material'
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

export const defaultTheme: IThemeContext = {
  type: defaultType(),
  toggle: () => undefined,
}

export const ThemeContext = createContext<IThemeContext>(defaultTheme)

export function ThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const [theme, setThemeType] = useState<'dark' | 'light'>(defaultType())
  const [muiTheme, setMuiTheme] = useState<Theme>(
    createTheme({ palette: { mode: theme } }),
  )

  useEffect(() => {
    if (theme === muiTheme.palette.mode) return
    setMuiTheme(createTheme({ palette: { mode: theme } }))
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

export function useTheme() {
  const data = useContext(ThemeContext)
  return data
}

export default ThemeContext
