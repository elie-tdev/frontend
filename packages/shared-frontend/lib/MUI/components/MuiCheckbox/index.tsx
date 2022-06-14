import React from 'react'

import { alpha } from '@mui/system'

import { CheckboxIcon } from '../../icons'
import ifLight from '../../utils/if-mode'

import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiCheckbox(theme: Theme): Components['MuiCheckbox'] {
  const { palette } = theme
  return {
    defaultProps: {
      disableFocusRipple: true,
      disableRipple: true,
      disableTouchRipple: true,
      icon: <CheckboxIcon.Empty />,
      checkedIcon: <CheckboxIcon.Checked />,
      indeterminateIcon: <CheckboxIcon.Indeterminate />,
    },
    styleOverrides: {
      root: {
        color: palette.grey['600'],
        '&:hover': {
          color: palette.grey['700'],
        },
        '& .BAICheckbox-wrapper': {
          borderRadius: 4,
          borderWidth: 2,
          borderColor: palette.grey['400'],
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          willChange: 'border-color, background-color',
          userSelect: 'none',
          contain: 'layout paint',
        },
        '&.MuiIconButton-root.Mui-focusVisible': {
          backgroundColor: 'transparent',
        },
        '&.Mui-focusVisible .BAICheckbox-wrapper': {
          boxShadow: `0px 0px 0px 4px ${palette.grey[300]}`,
          borderColor: palette.grey[500],
          color: palette.grey[500],
        },
        '& .BAICheckbox-wrapper svg': {
          color: palette.primary.contrastText,
        },
        '&.Mui-checked': {
          '&:not(.Mui-disabled) .BAICheckbox-wrapper': {
            borderColor: 'currentcolor',
            borderStyle: 'solid',
            backgroundColor: 'currentcolor',
          },
        },
        '&.Mui-disabled .BAICheckbox-wrapper': {
          backgroundColor: palette.grey['700'],
          borderColor: palette.grey['700'],
          opacity: 0.3,
        },
      },
      colorPrimary: {
        color: palette.primary.main,
        transition: 'color 300ms ease',
        '&:hover': {
          color: ifLight(
            t => t.primary.dark,
            t => t.primary.light,
            theme,
          ),
        },
        '&.Mui-focusVisible .BAICheckbox-wrapper': {
          boxShadow: `0px 0px 0px 4px ${alpha(palette.primary.light, 0.5)}`,
          borderColor: palette.primary.main,
          color: palette.primary.main,
        },
      },
      colorSecondary: {
        color: palette.secondary.main,
        transition: 'color 300ms ease',
        '&:hover': {
          backgroundColor: 'transparent',
          color: ifLight(
            t => t.secondary.dark,
            t => t.secondary.light,
            theme,
          ),
        },
        '&.Mui-focusVisible .BAICheckbox-wrapper': {
          boxShadow: `0px 0px 0px 4px ${alpha(palette.secondary.light, 0.5)}`,
          borderColor: palette.secondary.main,
          color: palette.secondary.main,
        },
      },
      indeterminate: {
        '&:not(.Mui-disabled) .BAICheckbox-wrapper': {
          borderColor: 'currentcolor',
          borderStyle: 'solid',
          backgroundColor: 'currentcolor',
        },
      },
    },
  }
}

export { MuiCheckbox }
