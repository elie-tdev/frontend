import React from 'react'
import type { ComponentProp } from 'design-system/pattern-utils'
import { AuthRouteStatus, PageLayoutObject, RouteConfig } from './types'
import {
  BaseItemLink,
  NavItemArray,
} from 'design-system/pattern-app-shell'
import { resolvePath, RouteObject } from 'react-router'

export type RouterWithIcon<T> = T & { icon?: ComponentProp }
export type RouterWithHiddenTrigger<T> = T & {
  navHidden: true
  triggerId: string
}

export interface RouterBaseHtmlElementProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  testid?: string
}

export interface RouterBaseItem extends RouterBaseHtmlElementProps {
  title: string
}

export interface RouterBaseItemLink<P extends PageLayoutObject, A>
  extends RouterBaseItem {
  path: string
  wrapper?: keyof P
  element: React.ReactNode
  authCheck?: (status: A) => AuthRouteStatus
  index?: boolean
}

export interface RouterBaseItemParent<P extends PageLayoutObject, A, T>
  extends RouterBaseItem {
  path: string
  wrapper?: keyof P
  element?: React.ReactNode
  authCheck?: (status: A) => AuthRouteStatus
  children: T[]
  forceNewFrame?: boolean
}

export type RouterNavItemRenderable<P extends PageLayoutObject, A> =
  | RouterWithIcon<RouterBaseItemLink<P, A>>
  | RouterWithIcon<
      RouterBaseItemParent<
        P,
        A,
        | RouterWithIcon<RouterBaseItemLink<P, A>>
        | RouterWithIcon<
            RouterBaseItemParent<P, A, RouterNavItemRenderable<P, A>>
          >
      >
    >

export type RouterHiddenNavItem<P extends PageLayoutObject, A> = {
  hiddenFrame: true
  triggerId: string
  title: string
  path: string
  wrapper?: keyof P
  element?: React.ReactNode
  authCheck?: (status: A) => AuthRouteStatus
  children: RouterNavItemRenderable<P, A>[]
}

export type RouterNavItem<P extends PageLayoutObject, A> =
  | RouterNavItemRenderable<P, A>
  | RouterHiddenNavItem<P, A>

export type RouterNavItemArray<P extends PageLayoutObject, A> = RouterNavItem<
  P,
  A
>[]

// const routes: RouterNavItemArray<PageLayoutObject, boolean> = [
//   {
//     title: 'Something',
//     testid: 'something-else',
//     path: '/',
//     children: [
//       {
//         title: 'Something',
//         element: <div>Hello</div>,
//         path: '/',
//       },
//     ],
//   },
// ]

const isHiddenItem = <P extends PageLayoutObject, A>(
  item: RouterNavItem<P, A>,
): item is RouterHiddenNavItem<P, A> =>
  'hiddenFrame' in item &&
  'children' in item &&
  !!item.children &&
  Array.isArray(item.children)
    ? true
    : false

const isBaseItemLink = <P extends PageLayoutObject, A>(
  item: RouterNavItemRenderable<P, A>,
): item is RouterWithIcon<RouterBaseItemLink<P, A>> =>
  'path' in item &&
  !!item.path &&
  'element' in item &&
  !!item.element &&
  !('children' in item || !!item.children)

const isBaseItemParent = <P extends PageLayoutObject, A>(
  item: RouterNavItemRenderable<P, A>,
): item is RouterWithIcon<
  RouterBaseItemParent<
    P,
    A,
    | RouterWithIcon<RouterBaseItemLink<P, A>>
    | RouterWithIcon<RouterBaseItemParent<P, A, RouterNavItemRenderable<P, A>>>
  >
> =>
  Boolean(
    'children' in item &&
      item.children &&
      Array.isArray(item.children) &&
      !('hiddenFrame' in item),
  )

export const __internal__pullOutNavItems = <P extends PageLayoutObject, A>(
  items:
    | RouterNavItemArray<P, A>
    | (
        | RouterWithIcon<RouterBaseItemLink<P, A>>
        | RouterWithIcon<
            RouterBaseItemParent<P, A, RouterNavItemRenderable<P, A>>
          >
        | RouterWithIcon<RouterBaseItemLink<P, A>>
      )[],
  parentPath = '',
): NavItemArray => {
  return items.map(item => {
    if (isHiddenItem(item) || isBaseItemParent(item)) {
      const children: any = __internal__pullOutNavItems(
        item.children,
        resolvePath(item.path, parentPath).pathname,
      )
      const { path: _, ...itemBase } = item
      return { ...itemBase, children } as NavItemArray[number]
    } else if (isBaseItemLink(item)) {
      const { path, title, testid = undefined, icon = undefined } = item
      return {
        href: resolvePath(path, parentPath).pathname,
        title,
        testid,
        icon,
      } as BaseItemLink
    } else {
      return item
    }
  })
}

export const __internal__pullOutRoutes = <P extends PageLayoutObject, A>(
  items:
    | RouterNavItemArray<P, A>
    | (
        | RouterWithIcon<RouterBaseItemLink<P, A>>
        | RouterWithIcon<
            RouterBaseItemParent<P, A, RouterNavItemRenderable<P, A>>
          >
        | RouterWithIcon<RouterBaseItemLink<P, A>>
      )[],
): RouteConfig<P, A>[] => {
  return items.map(item => {
    const {
      index,
      path,
      element,
      caseSensitive,
      children: _children,
      wrapper,
      authCheck,
    } = {
      index: undefined,
      element: undefined,
      caseSensitive: true,
      children: undefined,
      authCheck: undefined,
      wrapper: undefined,
      ...item,
    } as any
    let children: RouteObject[] | undefined = undefined
    if (!!_children && Array.isArray(_children)) {
      children = __internal__pullOutRoutes(_children as any)
    }

    return { index, path, element, caseSensitive, children, wrapper, authCheck }
  })
}
