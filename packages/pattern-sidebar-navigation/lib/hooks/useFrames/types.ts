import { useMemo } from 'react'
import type { ComponentProp } from 'design-system/pattern-utils'

export type WithIcon<T> = T & { icon?: ComponentProp }
export type WithHiddenTrigger<T> = T & { navHidden: true; triggerId: string }

interface BaseHtmlElementProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  testid?: string
}
export interface BaseItem extends BaseHtmlElementProps {
  title: string
}

export interface BaseItemLink extends BaseItem {
  href: string
}

export interface BaseItemParent<T> extends BaseItem {
  children: T[]
  forceNewFrame?: boolean
}

export type NavItemRenderable =
  | WithIcon<BaseItemLink>
  | WithIcon<
      BaseItemParent<
        WithIcon<BaseItemLink> | WithIcon<BaseItemParent<NavItemRenderable>>
      >
    >

export type HiddenNavItem = {
  hiddenFrame: true
  triggerId: string
  title: string
  children: NavItemRenderable[]
}

export type NavItem = NavItemRenderable | HiddenNavItem

/**
 *  # Navigation Item Array
 *
 * _See the [customization docs](https://github.com/swt-xd/Shared-Frontend/blob/main/packages/pattern-sidebar-navigation/docs/customization.md)
 * to learn more._
 *
 * An array of hierarchical NavigationItems which can be
 * turned into a Frames data-structure that the Navigation Panel
 * uses internally to render and access new frames quickly.
 * NOTE: this property should not be changed once it is initially set. It
 * will cause a re-indexing of frames, and will possibly cause performance
 * issues or 'jank' during render.
 *
 * ## Example Structure
 *
 * ```tsx
 * // routes.tsx
 * import { NavItemArray } from 'design-system/pattern-sidebar-navigation'
 * export const routes: NavItemArray = [
 *   //
 *   //  If you want to have icons:
 *   // { title: 'Home', href: '/home', icon: <HomeIcon /> },
 *   //
 *   // If you want to have test-ids presented in the DOM:
 *   // { title: 'Home', href: '/home', 'testid': 'home-item' }
 *   //
 *   { title: 'Home', href: '/home' },
 *   {
 *     title: 'About',
 *     children: [
 *       { title: 'History', href: '/about/history' },
 *       { title: 'Timeline', href: '/about/timeline' },
 *       { title: 'Values', href: '/about/values' },
 *       {
 *         title: 'Join',
 *         children: [
 *           {
 *             title: 'Culture',
 *             href: '/about/join/culture',
 *           },
 *           { title: 'Openings', href: '/about/join/openings' },
 *           { title: 'Apply', href: '/about/join/how-to' },
 *         ],
 *       },
 *     ],
 *   },
 * ]
 * ```
 */
export type NavItemArray = NavItem[]
export type NavItemRenderableArray = NavItemRenderable[]
export type NavItemHiddenArray = HiddenNavItem[]

export function isParentItem(
  item: NavItem,
): item is BaseItemParent<BaseItemLink | BaseItemParent<NavItem>> {
  if ('children' in item) {
    return Array.isArray(item.children)
  }
  return false
}

export function isLinkItem(item: NavItem): item is BaseItemLink {
  return 'href' in item
}

export interface NavFrameLink extends BaseItem {
  nextItem: number
}

export type NavFrameItem =
  | WithIcon<BaseItemLink>
  | WithIcon<NavFrameLink>
  | WithIcon<BaseItemParent<BaseItemLink | NavFrameLink>>

export interface NavFrame {
  parent: number | null
  parentItemTitle: string | null
  items: NavFrameItem[]
  isHiddenItem?: boolean
}

export const isHiddenNavItem = (item: NavItem): item is HiddenNavItem =>
  'hiddenFrame' in item &&
  item.hiddenFrame &&
  'triggerId' in item &&
  typeof item.triggerId === 'string'

// Group into Hidden and normal NavItems
export const groupItems = (
  allItems: NavItemArray,
): {
  hiddenItems: NavItemHiddenArray
  normalItems: NavItemRenderableArray
} => {
  const hiddenItems: NavItemHiddenArray = []
  const normalItems: NavItemRenderableArray = []
  allItems.forEach(item => {
    if (isHiddenNavItem(item)) {
      hiddenItems.push(item)
    } else {
      normalItems.push(item)
    }
  })
  return {
    hiddenItems,
    normalItems,
  }
}

/**
 * Group items into normal hierarchy and hidden items (memoized)
 */
export const useInternalGroupItems = (
  allItems: NavItemArray,
): {
  hiddenItems: NavItemHiddenArray
  normalItems: NavItemRenderableArray
} => useMemo(() => groupItems(allItems), [allItems])

// ensure that hidden items can only be used at the top-level in
// the type definition for NavItemArray
// const test: NavItemArray = [
//   {
//     title: 'Something',
//     hiddenFrame: true,
//     triggerId: 'string',
//     children: [
//       {
//         title: 'Something',
//         children: [],

//       },
//     ]
//   },
// ]
