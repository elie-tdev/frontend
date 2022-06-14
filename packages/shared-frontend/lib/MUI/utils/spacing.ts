import type { ThemeOptions } from '@mui/material/styles'

export function createDefaultSpacingOptions(theme: ThemeOptions = {}) {
  if (!theme.shape) {
    theme.shape = {
      borderRadius: 8,
    }
  }

  return theme
}
