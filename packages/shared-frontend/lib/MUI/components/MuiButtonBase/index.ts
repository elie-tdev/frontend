import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiButtonBase(theme: Theme): Components['MuiButtonBase'] {
  return {
    defaultProps: {
      disableRipple: true,
      disableTouchRipple: true,
    },
    styleOverrides: {
      root: {
        '&.Mui-focusVisible': {
          boxShadow: `0px 0px 1px ${theme.palette.grey['300']}`,
        },
      },
    },
  }
}

export { MuiButtonBase }
