import { createTheme as createMuiTheme } from '@mui/material/styles'

import { makeDefaultTheme } from './defaultTheme'
import { BAIThemeOptions } from './types'
import { createDefaultPaletteOptions } from './utils/palette'
import { createDefaultSpacingOptions } from './utils/spacing'

const createThemeBase = (themeOptions: BAIThemeOptions, isTest = false) => {
  createDefaultSpacingOptions(themeOptions)
  createDefaultPaletteOptions(themeOptions)
  return makeDefaultTheme(createMuiTheme(themeOptions), !isTest)
}

export const createTheme = (themeOptions: BAIThemeOptions = {}) =>
  createThemeBase(themeOptions)

export const createThemeTest = (themeOptions: BAIThemeOptions = {}) =>
  createThemeBase(themeOptions, true)
