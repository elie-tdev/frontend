import type { Components } from '@mui/material/styles/components'
import type { ComponentsProps } from '@mui/material/styles/props';
import type { Theme } from '@mui/material/styles/createTheme'

function MuiFormHelperText(_theme: Theme): Components['MuiFormHelperText'] {
  return {
    defaultProps: {
      component: 'div'
    } as ComponentsProps['MuiFormHelperText']
  }
}

export { MuiFormHelperText }
