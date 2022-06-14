import { ElementType } from 'react'

import type {
  ExtendButtonBase,
  ExtendButtonBaseTypeMap,
  ListItemButtonTypeMap,
} from '@mui/material'

import type { ComponentProp } from 'design-system/pattern-utils'

import type { ListItemButtonProps } from '@mui/material'

export type NavItemTopLevelProps<
  D extends ElementType = ListItemButtonTypeMap['defaultComponent'],
> =
  | Omit<
      ListItemButtonProps<
        D,
        {
          title: string
          icon?: ComponentProp
          isActive?: false
          isChildNavItem?: boolean
          setIsOpenTrue?: () => void
          isOpen?: boolean
          showForwardIcon?: boolean
          testid?: string | null
          showTestId?: boolean
        }
      >,
      'button' | 'children' | 'component'
    >
  | Omit<
      ListItemButtonProps<
        D,
        {
          title: string
          icon?: ComponentProp
          isChildNavItem?: boolean
          setIsOpenTrue?: () => void
          showForwardIcon?: boolean
          testid?: string | null
          showTestId?: boolean
        }
      >,
      'button' | 'component'
    >

export type NavItemChildProps<
  D extends ElementType = ListItemButtonTypeMap['defaultComponent'],
> =
  | Omit<
      ListItemButtonProps<
        D,
        {
          title: string
          isActive: boolean
          isChildNavItem?: boolean
          setIsOpenTrue?: () => void
          isOpen?: boolean
          icon?: ComponentProp
          showForwardIcon?: boolean
          testid?: string | null
          showTestId?: boolean
        }
      >,
      'button' | 'children' | 'component'
    >
  | Omit<
      ListItemButtonProps<
        D,
        {
          title: string
          isChildNavItem?: boolean
          setIsOpenTrue?: () => void
          icon?: ComponentProp
          showForwardIcon?: boolean
          testid?: string | null
          showTestId?: boolean
        }
      >,
      'button' | 'component'
    >

export type NavItemProps<
  D extends ElementType = ListItemButtonTypeMap['defaultComponent'],
> = NavItemTopLevelProps<D> | NavItemChildProps<D>

export type NavItemTypeMap<
  P = {},
  D extends ElementType = 'a',
> = ExtendButtonBaseTypeMap<{
  props: P & NavItemProps
  defaultComponent: D
}>

export type NavItemComponent = ExtendButtonBase<NavItemTypeMap>
