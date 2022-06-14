import type { ThemeOptions } from '@mui/material/styles'

export function createDefaultPaletteOptions(theme: ThemeOptions = {}) {
  const type = theme?.palette?.mode === 'dark' ? 'dark' : 'light'
  const primary =
    type === 'dark'
      ? { main: '#64B5F5', contrastText: '#000000' }
      : {
          main: '#1B76D4',
          contrastText: '#FFFFFF',
        }

  const secondary =
    type === 'dark'
      ? {
          main: '#BDBDBD',
          contrastText: '#000000',
        }
      : { main: '#757575', contrastText: '#FFFFFF' }

  if (!theme.palette) {
    theme.palette = {}
  }

  if (!theme.palette.primary) {
    theme.palette.primary = primary
  }

  if (!theme.palette.secondary) {
    theme.palette.secondary = secondary
  }

  return theme
}
