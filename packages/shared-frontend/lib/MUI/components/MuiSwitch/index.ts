import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

const height = 32
const width = 52
const outline = 3
const heightSmall = 16
const widthSmall = 28
const outlineSmall = 2

function MuiSwitch({ palette }: Theme): Components['MuiSwitch'] {
  return {
    defaultProps: {
      focusRipple: false,
    },
    styleOverrides: {
      root: {
        width: width,
        height: height,
        padding: 0,
        margin: 8,
        contain: 'strict',
        color: palette.mode === 'light' ? palette.grey[400] : palette.grey[800],
      },
      switchBase: {
        padding: outline,
        '&.Mui-checked': {
          transform: `translateX(${width - height}px)`,
          '& + &.MuiSwitch-track': {
            backgroundColor: 'currentColor',
            opacity: 1,
            border: 'none',
          },
        },
        '&.Mui-disabled': {
          border: 'none',
          backgroundColor: 'none',
          opacity: 0.4,
          '&.Mui-checked': {
            opacity: 0.4,
          },
          '&.Mui-checked + .MuiSwitch-track, & + .MuiSwitch-track': {
            opacity: 0.2,
            border: 'none',
          },
          '& .MuiSwitch-thumb': {
            boxShadow: 'none',
          },
        },
        '&.Mui-focusVisible': {
          '& .MuiSwitch-thumb': {
            boxShadow: 'none',
          },
          '& + .MuiSwitch-track': {
            boxShadow: `inset 0px 0px 0px 1px ${palette.grey['400']}, inset 0px 0px 0px 3px ${palette.primary.contrastText}`,
          },
        },
        '&.Mui-focusVisible.Mui-checked': {
          '&.MuiSwitch-colorPrimary': {
            '& + .MuiSwitch-track': {
              boxShadow: `inset 0px 0px 0px 1px ${palette.primary.main}, inset 0px 0px 0px 3px ${palette.primary.contrastText}`,
            },
          },
          '&.MuiSwitch-colorSecondary': {
            '& + .MuiSwitch-track': {
              boxShadow: `inset 0px 0px 0px 1px ${palette.secondary.main}, inset 0px 0px 0px 3px ${palette.secondary.contrastText}`,
            },
          },
        },
      },
      thumb: {
        width: height - outline * 2,
        height: height - outline * 2,
        backgroundColor: 'white',
        border: `inset 2px solid ${palette.grey['400']}`,
      },
      track: {
        borderRadius: height / 2,
        backgroundColor: 'currentColor',
        opacity: 1,
        transition: 'background-color 200ms ease, border 200ms ease',
        willChange: 'background-color, border, box-shadow',
      },
      colorPrimary: {
        '&.Mui-checked + .MuiSwitch-track': {
          color: palette.primary.main,
          opacity: 1,
        },
      },
      colorSecondary: {
        '&.Mui-checked + .MuiSwitch-track': {
          color: palette.secondary.main,
          opacity: 1,
        },
      },
      input: {
        backgroundColor: 'transparent',
      },
      sizeSmall: {
        height: heightSmall,
        width: widthSmall,
        '& .MuiSwitch-switchBase': {
          padding: outlineSmall * 2,
          margin: -1 * outlineSmall,
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&.Mui-checked': {
            transform: `translateX(${widthSmall - heightSmall}px)`,
          },
        },
        '& .MuiSwitch-thumb': {
          width: heightSmall - outlineSmall * 2,
          height: heightSmall - outlineSmall * 2,
          // padding: 0,
        },
        '& .MuiSwitch-track': {
          borderRadius: heightSmall / 2,
        },
      },
    },
  }
}

export { MuiSwitch }
