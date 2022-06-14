import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiIconButton(_theme: Theme): Components['MuiIconButton'] {
  return {
    defaultProps: {
      disableRipple: true,
      disableFocusRipple: true,
      disableTouchRipple: true,
      focusRipple: false,
    },
  }
}

export { MuiIconButton }
