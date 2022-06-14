import type { ComponentsVariants } from '@mui/material/styles/variants'
import type { Theme } from '@mui/material/styles/createTheme'
import { HighlightColorsBase } from '../../utils/mixins'
import { colors } from './'

const containedStyles = (
  color: HighlightColorsBase,
  { palette, mixins }: Theme,
) => ({
  color: palette[color].contrastText,
  backgroundColor: palette[color].main,
  boxShadow: '0 0 0px rgba(0,0,0,.001)',
  transition: 'color 300ms ease, box-shadow 300ms ease',
  '&:hover': {
    backgroundColor:
      palette.mode === 'dark' ? palette[color].light : palette[color].dark,
  },
  '&:focus': {
    backgroundColor:
      palette.mode === 'dark' ? palette[color].light : palette[color].dark,
    ...mixins._BAI_internal.both(color).main,
  },
  '&:focus:hover': {
    backgroundColor:
      palette.mode === 'dark' ? palette[color].light : palette[color].dark,
    ...mixins._BAI_internal.both(color).main,
  },
  '&.Mui-focusVisible': {
    backgroundColor:
      palette.mode === 'dark' ? palette[color].light : palette[color].dark,
    ...mixins._BAI_internal.groupContained(color).focusVisible,
  },
  '&.MuiButtonGroup-groupedContained:focus': {
    ...mixins._BAI_internal.both(color).main,
  },
  '&.MuiButtonGroup-groupedContained:hover': {
    ...mixins._BAI_internal.both(color).main,
  },
  '&.MuiButtonGroup-groupedContained:focus:hover': {
    ...mixins._BAI_internal.both(color).main,
  },
  '&.MuiButtonGroup-groupedContained.Mui-focusVisible': {
    backgroundColor:
      palette.mode === 'dark' ? palette[color].light : palette[color].dark,
    ...mixins._BAI_internal.groupContained(color).focusVisible,
  },
})

const Contained = (
  theme: Theme,
): NonNullable<ComponentsVariants['MuiButton']> =>
  colors.map(name => ({
    props: { variant: 'contained', color: name },
    style: containedStyles(name, theme),
  })) as NonNullable<ComponentsVariants['MuiButton']>

export default Contained
export { colors }
