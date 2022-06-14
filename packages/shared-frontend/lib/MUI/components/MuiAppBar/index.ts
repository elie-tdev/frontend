import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiAppBar(_theme: Theme): Components['MuiAppBar'] {
  return {
    defaultProps: {
      color: 'inherit',
      variant: 'outlined',
      elevation: 0,
    },
  }
}

export { MuiAppBar }
