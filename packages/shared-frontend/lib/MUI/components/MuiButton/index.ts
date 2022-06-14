import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'
import { HighlightColorsBase } from '../../utils/mixins'
import contained from './contained'
import outlined from './outlined'
import text from './text'

export const colors: HighlightColorsBase[] = [
  'primary',
  'secondary',
  'error',
  'info',
  'success',
  'warning',
]

function MuiButton(theme: Theme): Components['MuiButton'] {
  return {
    defaultProps: {
      disableElevation: true,
      disableFocusRipple: true,
      disableRipple: true,
      disableTouchRipple: true,
    },
    variants: [...contained(theme), ...outlined(theme), ...text(theme)],
  }
}

export { MuiButton }
