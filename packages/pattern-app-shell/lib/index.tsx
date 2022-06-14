// =================================
//
// Main Exports
//
// =================================

export { AppShell } from './component'
export { NavigationTopBar } from './components/NavigationTopbar'
export { NoShell } from './components/NoShell'

export {
  useBreakpoints,
  useLeftPanel,
  useShellVisibility,
  useRightPanel,
} from './hooks/public'

export type { AppShellComponentProps, AppShellProps } from './types/props'

// =================================
//
// Sidebar Re-Exports
//
// =================================

export {
  BackButton,
  NavItem,
  useFrames,
  useNavigationFrame,
  useTriggerFrame,
} from 'design-system/pattern-sidebar-navigation'

export type {
  NavItemArray,
  NavItemProps,
  NavItemType,
  NavItemTypeMap,
  BaseItem,
  BackButtonProps,
  BaseItemLink,
  BaseItemParent,
  NavFrame,
  NavFrameItem,
  NavFrameLink,
} from 'design-system/pattern-sidebar-navigation'

// =================================
//
// Utils Re-Exports
//
// =================================

export type {
  SxProp,
  ComponentProp,
  LinkComponent,
} from 'design-system/pattern-utils'

export { createLinkComponent } from 'design-system/pattern-utils'
