import React, { ReactElement } from 'react'

import LowLevelNavItem from './components/LowLevel'
import TopLevelNavItem from './components/TopLevel'

import type { NavItemComponent, NavItemProps } from './types'

function NavItemElement({
  isChildNavItem = false,
  ...props
}: NavItemProps & { isChildNavItem?: boolean }): ReactElement {
  if (!isChildNavItem) {
    return <TopLevelNavItem {...props} />
  } else {
    return <LowLevelNavItem {...props} />
  }
}

const NavItem = NavItemElement as NavItemComponent

export default NavItem
