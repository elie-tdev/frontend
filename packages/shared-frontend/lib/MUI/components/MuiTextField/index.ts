import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiTextField(_theme: Theme): Components['MuiTextField'] {
  return {
    defaultProps: {
      variant: 'filled',
    },
  }
}

export { MuiTextField }
