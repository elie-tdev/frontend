import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiPaper(_theme: Theme): Components['MuiPaper'] {
  return {
    defaultProps: {
      variant: 'outlined',
      elevation: 0,
    },
  }
}

export { MuiPaper }
