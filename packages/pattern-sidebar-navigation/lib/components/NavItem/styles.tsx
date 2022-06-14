import { alpha, lighten, Theme } from '@mui/material'
import { deepmerge } from '@mui/utils'
import type { SxProp } from 'design-system/pattern-utils'
const TEXT_CLASS = 'Mui-NavItemText'
const BUTTON_ACTIVE_CLASS = 'Mui-navItemActive'

export const ListItemTextClass = () => TEXT_CLASS
export const ListItemButtonClass = (isActive: boolean) =>
  isActive ? BUTTON_ACTIVE_CLASS : ''

export const classname = (id: 'text' | 'active') =>
  `.${id === 'text' ? TEXT_CLASS : BUTTON_ACTIVE_CLASS}`

export const NavItemStyles = (
  theme: Theme,
  custom: SxProp,
  merge: SxProp = {},
): SxProp => {
  const styles = {
    backgroundColor: 'transparent',
    '&:hover, &:focus, &.Mui-focusVisible, &.Mui-focus, &.Mui-active, &.Mui-selected, &.Mui-selected:hover':
      {
        backgroundColor: 'transparent',
      },
    [`&.Mui-focusVisible ${classname('text')}, &:focus-visible ${classname(
      'text',
    )}`]: {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.focusOpacity,
      ),
    },
    [`& ${classname('text')}`]: {
      transition: `color ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn}, background-color ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeIn}`,
    },
    [`&:hover ${classname('text')}`]: {
      color: alpha(theme.palette.text.primary, 0.76),
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
    },
    [`&${classname('active')} ${classname('text')}`]: {
      backgroundColor: alpha(
        theme.palette.primary.main,
        theme.palette.action.selectedOpacity,
      ),
      color:
        theme.palette.mode === 'light'
          ? theme.palette.primary.main
          : lighten(theme.palette.primary.light, 0.4),
      '&:hover': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.primary.main
            : lighten(theme.palette.primary.light, 0.6),
      },
    },
  }

  return deepmerge(deepmerge(styles, custom), merge)
}
