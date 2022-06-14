import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'
import ifLight from '../../utils/if-mode'

function MuiFilledInput(theme: Theme): Components['MuiFilledInput'] {
  return {
    defaultProps: {
      disableUnderline: true,
    },
    styleOverrides: {
      root: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: 'transparent',
        boxShadow: `0px 0px 0px 1px ${ifLight(
          t => t.grey[400],
          t => t.grey['800'],
          theme,
        )}`,
        borderStyle: 'solid',
        borderWidth: 0,
        '&.MuiInputBase-root': {
          backgroundColor: 'transparent',
        },
        '&:hover': {
          boxShadow: `0px 0px 0px 1px ${theme.palette.text.primary}`,
        },
        '&.Mui-error, &.MuiInputBase-colorSecondary.Mui-error': {
          boxShadow: `0px 0px 0px 1px ${theme.palette.error.main}`,
          '&.Mui-focused, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: `0px 0px 0px 2px ${theme.palette.error.main}`,
          },
        },
        '&.Mui-focused, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: `0px 0px 0px 2px ${theme.palette.primary.main}`,
          '&.MuiInputBase-colorSecondary': {
            boxShadow: `0px 0px 0px 2px ${theme.palette.secondary.main}`,
          },
        },
      },
      focused: {
        borderWidth: 2,
        backgroundColor: 'transparent',
      },
      input: {
        backgroundColor: 'transparent',
        '&.Mui-focused, &.Mui-focusVisible, &.Mui-active': {
          backgroundColor: 'transparent !important',
        },
      },
    },
  }
}

export { MuiFilledInput }
