import type { Components } from '@mui/material/styles/components'
import type { Theme } from '@mui/material/styles/createTheme'

function MuiSlider({ palette }: Theme): Components['MuiSlider'] {
  return {
    styleOverrides: {
      thumb: {
        height: 22,
        width: 22,
        marginTop: 0,
        marginLeft: 0,
        '&:not(.MuiSlider-thumbSizeSmall)': {
          backgroundColor: '#fff',
          boxShadow: `0px 4px 8px 0px rgba(0, 0, 0, 0.15), inset 0 0 1px 1px ${palette.grey['300']}`,
        },
      },
      track: {
        border: 'none',
      },
      thumbSizeSmall: {
        height: 12,
        width: 12,
        boxShadow: 'none',
        transformOrigin: 'center',
        transition: 'transform 150ms',
        '&:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: 'none',
        },
        '&:hover, &.Mui-active': {
          transform: 'scale(150%) translateY(-35%) translateX(-35%)',
          '& > .MuiSlider-valueLabelOpen': {
            transform: 'scale(75%) translateY(-110%)',
          },
        },
      },
    },
  }
}

export { MuiSlider }
