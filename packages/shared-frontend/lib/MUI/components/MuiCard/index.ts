import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiCard(_theme: Theme): Components['MuiCard'] {
  return {
    defaultProps: {
      elevation: 0,
      variant: 'outlined',
    },
  }
}

export { MuiCard }
