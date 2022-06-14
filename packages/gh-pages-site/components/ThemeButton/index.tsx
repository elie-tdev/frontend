import React, { ReactElement } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { useTheme } from '@hooks/useTheme'

interface ToggleButtonProps {
  sx?: ButtonProps['sx']
}

export function ThemeToggleButton({ sx }: ToggleButtonProps): ReactElement {
  const { toggle: toggleTheme, type: themeType } = useTheme()

  return (
    <Button color="inherit" sx={sx} onClick={toggleTheme}>
      {themeType === 'light' ? 'Dark Theme' : 'Light Theme'}
    </Button>
  )
}
