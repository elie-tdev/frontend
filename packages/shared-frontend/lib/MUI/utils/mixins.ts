import { alpha, darken } from '@mui/material/styles'

import type { Theme } from '@mui/material/styles'

export type HighlightColors =
  | 'primary'
  | 'secondary'
  | 'grey'
  | 'info'
  | 'error'
  | 'warning'
  | 'success'

export type HighlightColorsBase =
  | 'primary'
  | 'secondary'
  | 'info'
  | 'error'
  | 'warning'
  | 'success'

export function makeInternalMixins({ palette }: Theme) {
  const makeC = (props: HighlightColors) => ({
    300:
      props === 'grey' ? palette.grey['300'] : alpha(palette[props].light, 0.2),
    400: props === 'grey' ? palette.grey['400'] : palette[props].light,
    600: props === 'grey' ? palette.grey['600'] : palette[props].dark,
    contrastText:
      props === 'grey' ? palette.grey['50'] : palette[props].contrastText,
    800:
      props === 'grey' ? palette.grey['800'] : darken(palette[props].dark, 0.3),
  })

  const hlbothContained = (props: HighlightColors) => {
    const c = makeC(props)
    return {
      main: {
        boxShadow: `0px 0px 4px ${c['400']}, 0px 0px 6px ${c['400']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['600']}, inset 0px 0px 0px 4px ${c.contrastText}`,
      },
    }
  }

  const hlbothOutline = (props: HighlightColors) => {
    const c = makeC(props)
    return {
      main: {
        boxShadow: `0px 0px 4px 0px ${c['300']}, 0px 0px 6px ${c['400']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['400']}`,
      },
    }
  }

  const hlboth = (props: HighlightColors) => {
    const c = makeC(props)
    return {
      main: {
        boxShadow: `0px 0px 4px 0px ${c['300']}, 0px 0px 6px ${c['400']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['800']}`,
      },
    }
  }

  const hlgroupContained = (props: HighlightColors, fv = false) => {
    const c = makeC(props)
    return {
      main: {
        boxShadow: `inset 0px 0px 0px ${fv ? '2' : '1'}px ${c['600']}`,
      },
      focusVisible: {
        boxShadow: `inset 0px 0px 0px 2px ${c['600']}, inset 0px 0px 0px 4px ${c.contrastText}`,
      },
    }
  }

  const hlgroupOutline = (props: HighlightColors, fv = false) => {
    const c = makeC(props)
    return {
      boxShadow: `inset 0px 0px 0px ${fv ? '2' : '0'}px ${c['400']}`,
    }
  }

  const hlgroupText = (props: HighlightColors, fv = false) => {
    const c = makeC(props)
    return {
      boxShadow: `inset 0px 0px 0px ${fv ? '2' : '0'}px ${
        palette.mode === 'dark' ? c['800'] : c['300']
      }`,
    }
  }

  return {
    bothContained: hlbothContained,
    bothOutline: hlbothOutline,
    both: hlboth,
    groupContained: hlgroupContained,
    groupOutline: hlgroupOutline,
    groupText: hlgroupText,
  }
}
