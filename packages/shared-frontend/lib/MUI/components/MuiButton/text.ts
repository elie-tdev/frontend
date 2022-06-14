import type { ComponentsVariants } from '@mui/material/styles/variants'
import type { Theme } from '@mui/material/styles/createTheme'
import ifLight from '../../utils/if-mode'
import { HighlightColorsBase } from '../../utils/mixins'
import { colors } from './'

const textStyles = (color: HighlightColorsBase, theme: Theme) => {
  const { mixins } = theme
  return {
    boxShadow: '0 0 0px rgba(0,0,0,.001)',
    transition: 'color 300ms ease, box-shadow 300ms ease',
    '&:hover': {
      color: ifLight(
        t => t[color].dark,
        t => t[color].light,
        theme,
      ),
    },
    '&:focus': {
      color: ifLight(
        t => t[color].dark,
        t => t[color].light,
        theme,
      ),
    },
    '&:focus:hover': {
      color: ifLight(
        t => t[color].dark,
        t => t[color].light,
        theme,
      ),
    },
    '&.Mui-focusVisible': {
      color: ifLight(
        t => t[color].dark,
        t => t[color].light,
        theme,
      ),
      ...mixins._BAI_internal.bothOutline(color).focusVisible,
    },
    '&.MuiButtonGroup-groupedText:focus': {
      ...mixins._BAI_internal.groupText(color),
    },
    '&.MuiButtonGroup-groupedText:hover': {
      ...mixins._BAI_internal.groupText(color),
    },
    '&.MuiButtonGroup-groupedText:focus:hover': {
      ...mixins._BAI_internal.groupText(color),
    },
    '&.MuiButtonGroup-groupedText.Mui-focusVisible': {
      ...mixins._BAI_internal.groupText(color, true),
    },
  }
}

const text = (theme: Theme): NonNullable<ComponentsVariants['MuiButton']> =>
  colors.map(name => ({
    props: { variant: 'text', color: name },
    style: textStyles(name, theme),
  })) as NonNullable<ComponentsVariants['MuiButton']>

export default text
