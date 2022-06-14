import type { ComponentsVariants } from '@mui/material/styles/variants'
import type { Theme } from '@mui/material/styles/createTheme'
import ifLight from '../../utils/if-mode'
import { HighlightColorsBase } from '../../utils/mixins'
import { colors } from './'

const outlinedStyles = (color: HighlightColorsBase, theme: Theme) => {
  const { palette, mixins } = theme

  return {
    borderStyle: 'solid',
    borderWidth: '1px',
    boxShadow: '0 0 0px rgba(0,0,0,.001)',
    transition:
      'color 300ms ease, border-color 300ms ease, box-shadow 300ms ease',
    '&:hover': {
      color: ifLight(
        t => t[color].dark,
        t => t[color].light,
        theme,
      ),
    },
    '&:focus': {
      ...mixins._BAI_internal.bothOutline(color).main,
    },
    '&:focus:hover': {
      ...mixins._BAI_internal.bothOutline(color).main,
    },
    '&.Mui-focusVisible': {
      ...mixins._BAI_internal.bothOutline(color).focusVisible,
    },
    '&.MuiButtonGroup-groupedOutlined:focus': {
      ...mixins._BAI_internal.groupOutline(color),
    },
    '&.MuiButtonGroup-groupedOutlined:hover': {
      ...mixins._BAI_internal.groupOutline(color),
    },
    '&.MuiButtonGroup-groupedOutlined:focus:hover': {
      ...mixins._BAI_internal.groupOutline(color),
    },
    '&.MuiButtonGroup-groupedOutlined.Mui-focusVisible': {
      ...mixins._BAI_internal.groupOutline(color, true),
    },
    '&.MuiButtonGroup-groupedOutlinedHorizontal:not(:last-child):focus + .MuiButtonGroup-groupedOutlinedHorizontal.MuiButtonGroup-groupedOutlinedHorizontal.MuiButton-outlined':
      {
        borderLeftColor: palette[color].main,
      },
    '&.MuiButtonGroup-groupedOutlinedHorizontal:not(:last-child):hover + .MuiButtonGroup-groupedOutlinedHorizontal.MuiButtonGroup-groupedOutlinedHorizontal.MuiButton-outlined':
      {
        borderLeftColor: palette[color].main,
      },
    '&.MuiButtonGroup-groupedOutlinedVertical:not(:last-child):focus + .MuiButtonGroup-groupedOutlinedVertical.MuiButtonGroup-groupedOutlinedVertical.MuiButton-outlined':
      {
        borderTopColor: palette[color].main,
      },
    '&.MuiButtonGroup-groupedOutlinedVertical:not(:last-child):hover + .MuiButtonGroup-groupedOutlinedVertical.MuiButtonGroup-groupedOutlinedVertical.MuiButton-outlined':
      {
        borderTopColor: palette[color].main,
      },
  }
}

const outlined = (theme: Theme): NonNullable<ComponentsVariants['MuiButton']> =>
  colors.map(name => ({
    props: { variant: 'outlined', color: name },
    style: outlinedStyles(name, theme),
  })) as NonNullable<ComponentsVariants['MuiButton']>

export default outlined
