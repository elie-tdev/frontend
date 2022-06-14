import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiButtonGroup(_theme: Theme): Components['MuiButtonGroup'] {
  return {
    defaultProps: {
      disableElevation: true,
      disableFocusRipple: true,
      disableRipple: true,
    },
  }
}

export { MuiButtonGroup }
