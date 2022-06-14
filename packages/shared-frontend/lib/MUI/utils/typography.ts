import { createTheme, responsiveFontSizes } from '@mui/material/styles'

import type { Theme } from '@mui/material/styles/createTheme'

import type { CSSProperties } from '@mui/material/styles/createTypography'

/**
 * @description Material uses 1.4 for h6-h3 and 1.25 for h2 and h1. This will retun a function that allows you to pass in the iBAIement of the scale and will return to you a font size.
 * @param baseSize - base font size to use when making a modular scale.
 * @example
 *```
  const baseFontSize = 16
  const modularScale = 1.225
  const scaleText = createModularScale(baseFontSize, modularScale)
  const headingSizes = {
    p: scaleText(0)  // 16 (same as baseFontSize)
    h6: scaleText(1) // 20
    h5: scaleText(2) // 24
    h4: scaleText(3) // 29
    h3: scaleText(4) // 36
  }
 *```
 * @param modularScale - the modular scale you'd like to use
 * @returns - a function that takes a degree of the modular scale, and returns a number representing a font-size in pixels.
 */
export const createModularScale =
  (baseSize: number, modularScale = 1.225) =>
  (size: number) => {
    if (size === 0) return baseSize
    if (size < 0) {
      return baseSize - Math.abs(size)
    }
    let bs = baseSize
    for (let i = 0; i <= size; i++) {
      bs = bs * modularScale
    }
    return Math.round(bs)
  }

/**
 * @description A function that will create the correct kerning value for a given font size passed as a numerical value (in pixels) when using Inter.
 * @param fontSize - the font size you'd like to create letter spacing for
 * @returns A string specifying the correct letter spacing in em's
 */
export const letterSpacing = (fontSize: number): string => {
  const a = -0.0223,
    b = 0.185,
    c = -0.1745,
    z = fontSize

  return `${(a + b * Math.exp(c * z)).toFixed(4)}em`
}

const createMuiDefault = <
  T extends {
    fontWeight: number
    fontSize: number
    lineHeight: number
    letterSpacing?: number
  } & CSSProperties = any,
>(
  props: T,
) => {
  if (props.letterSpacing) {
    return props
  }

  return {
    ...props,
    letterSpacing: letterSpacing(props.fontSize),
  }
}

const fontWeightRegular = 400
const fontWeightMedium = 500
const fontWeightBold = 700

/**
 * @description Create Material-UI Typography default sizes, but that better match the defaults of the BAI Base Product Theme.
 */
export const BAIMuiDefaultTypography = (theme: Theme) => {
  theme.typography = responsiveFontSizes(
    createTheme({
      typography: {
        fontFamily: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
        h1: createMuiDefault({
          fontWeight: fontWeightBold,
          fontSize: 96,
          lineHeight: 1.167,
        }),
        h2: createMuiDefault({
          fontWeight: fontWeightBold,
          fontSize: 60,
          lineHeight: 1.2,
        }),
        h3: createMuiDefault({
          fontWeight: fontWeightBold,
          fontSize: 48,
          lineHeight: 1.167,
        }),
        h4: createMuiDefault({
          fontWeight: fontWeightBold,
          fontSize: 34,
          lineHeight: 1.235,
        }),
        h5: createMuiDefault({
          fontWeight: fontWeightBold,
          fontSize: 24,
          lineHeight: 1.334,
        }),
        h6: createMuiDefault({
          fontWeight: fontWeightBold,
          fontSize: 20,
          lineHeight: 1.6,
        }),
        subtitle1: createMuiDefault({
          fontWeight: fontWeightRegular,
          fontSize: 16,
          lineHeight: 1.75,
        }),
        subtitle2: createMuiDefault({
          fontWeight: fontWeightMedium,
          fontSize: 14,
          lineHeight: 1.57,
        }),
        body1: createMuiDefault({
          fontWeight: fontWeightRegular,
          fontSize: 16,
          lineHeight: 1.5,
        }),
        body2: createMuiDefault({
          fontWeight: fontWeightRegular,
          fontSize: 14,
          lineHeight: 1.43,
        }),
        button: createMuiDefault({
          fontWeight: fontWeightMedium,
          fontSize: 14,
          lineHeight: 1.75,
          textTransform: 'none',
        }),
        caption: createMuiDefault({
          fontWeight: fontWeightRegular,
          fontSize: 12,
          lineHeight: 1.66,
        }),
        overline: createMuiDefault({
          fontWeight: fontWeightRegular,
          fontSize: 12,
          lineHeight: 2.66,
          letterSpacing: 1,
        }),
      },
    }),
  ).typography
}
