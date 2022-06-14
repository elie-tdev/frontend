import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiInputLabel(_theme: Theme): Components['MuiInputLabel'] {
  return {
    styleOverrides: {
      filled: {
        '&:not(.MuiInputLabel-shrink):not(.MuiInputLabel-sizeSmall)': {
          transform: 'translate(12px, 18px) scale(1)',
        },
      },
    },
  }
}

export { MuiInputLabel }
