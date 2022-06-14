import type { Theme } from '@mui/material/styles'

export default function ifLight<T>(
  useColor: (t: Theme['palette']) => T,
  elseColor: (t: Theme['palette']) => T,
  theme: Theme,
) {
  if (theme.palette.mode === 'light') {
    return useColor(theme.palette)
  } else {
    return elseColor(theme.palette)
  }
}
