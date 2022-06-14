import React from 'react'

import { alpha } from '@mui/material'

import { RadioIcon } from '../../icons'
import ifLight from '../../utils/if-mode'

import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiRadio(theme: Theme): Components['MuiRadio'] {
  const { palette } = theme
  return {
    defaultProps: {
      icon: <RadioIcon.Empty />,
      checkedIcon: <RadioIcon.Checked />,
    },
    styleOverrides: {
      root: {
        color: palette.grey[500],
        '& .BAIRadio-wrapper': {
          borderRadius: '500px',
          borderWidth: 2,
          borderColor: palette.grey[400],
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          transition: 'background-color 300ms ease',
          userSelect: 'none',
          contain: 'layout paint',
        },
        '&.Mui-focusVisible': {
          boxShadow: 'none',
        },
        '&.Mui-checked': {
          '& .BAIRadio-wrapper': {
            background: 'currentcolor',
            borderColor: 'currentcolor',
          },
        },
        '&.Mui-disabled': {
          color: palette.grey[400],
          '& .BAIRadio-wrapper': {
            opacity: 0.3,
          },
        },
        '&:hover': {
          background: 'none',
        },
      },
      colorPrimary: {
        color: palette.primary.main,
        '& .BAIRadio-wrapper svg': {
          color: palette.primary.contrastText,
        },
        '&:hover, &.Mui-checked:hover': {
          backgroundColor: 'transparent',
          color: ifLight(
            t => t.primary.dark,
            t => t.primary.light,
            theme,
          ),
        },
        '&.Mui-focusVisible .BAIRadio-wrapper': {
          borderColor: palette.primary.dark,
          boxShadow: `0px 0px 0px 4px ${alpha(palette.primary.light, 0.5)}`,
        },
      },
      colorSecondary: {
        color: palette.secondary.main,
        '& .BAIRadio-wrapper svg': {
          color: palette.secondary.contrastText,
        },
        '&:hover, &.Mui-checked:hover': {
          backgroundColor: 'transparent',
          color: ifLight(
            t => t.secondary.dark,
            t => t.secondary.light,
            theme,
          ),
        },
        '&.Mui-focusVisible .BAIRadio-wrapper': {
          borderColor: palette.secondary.dark,
          boxShadow: `0px 0px 0px 4px ${alpha(palette.secondary.light, 0.5)}`,
        },
      },
    },
  }
}

export { MuiRadio }
