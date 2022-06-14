import './utils/types.mixins'

import { createTheme } from '@mui/material/styles'

import {
  MuiAppBar,
  MuiButton,
  MuiButtonBase,
  MuiButtonGroup,
  MuiCard,
  MuiCheckbox,
  MuiFilledInput,
  MuiIconButton,
  MuiInputLabel,
  MuiPaper,
  MuiRadio,
  MuiSlider,
  MuiSwitch,
  MuiTextField,
  MuiFormHelperText,
} from './components'
import { makeInternalMixins } from './utils/mixins'
import { BAIMuiDefaultTypography } from './utils/typography'

import type { Theme } from '@mui/material/styles/createTheme'

/**
 * This allows us to isolate the component creation from the rest of the theme
 * so that we can test the components in isolation using the same function
 */
const makeThemeComponents = (theme: Theme) => {
  // save user-configured spacing function
  const initialSpacing = theme.spacing
  // set spacing function to the default, temporarily
  // as the components depend on it being 8
  theme.spacing = createTheme({}).spacing

  theme.components = {
    MuiAppBar: MuiAppBar(theme),
    MuiButton: MuiButton(theme),
    MuiButtonBase: MuiButtonBase(theme),
    MuiButtonGroup: MuiButtonGroup(theme),
    MuiCheckbox: MuiCheckbox(theme),
    MuiCard: MuiCard(theme),
    MuiFilledInput: MuiFilledInput(theme),
    MuiIconButton: MuiIconButton(theme),
    MuiInputLabel: MuiInputLabel(theme),
    MuiPaper: MuiPaper(theme),
    MuiRadio: MuiRadio(theme),
    MuiSlider: MuiSlider(theme),
    MuiSwitch: MuiSwitch(theme),
    MuiTextField: MuiTextField(theme),
    MuiFormHelperText: MuiFormHelperText(theme),
  }

  // set spacing back to the user-configured value
  theme.spacing = initialSpacing
}

/**
 * @abstract - Function used to create a theme
 * @description - The second part of this function defaults to true, and is
 * made available for testing purposes.
 *
 * @param theme - theme to merge
 * @param makeComponents - whether or not to use components
 * @returns - modified theme
 */
export function makeDefaultTheme(theme: Theme, makeComponents = true) {
  BAIMuiDefaultTypography(theme)
  theme.mixins = {
    ...theme.mixins,
    _BAI_internal: makeInternalMixins(theme),
  }

  if (makeComponents) makeThemeComponents(theme)

  return theme
}
