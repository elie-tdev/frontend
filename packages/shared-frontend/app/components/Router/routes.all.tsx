import React, { lazy } from 'react'
import { PartialRouteObject } from 'react-router'

import { ComponentsRoutes } from './routes.components'
import { PagesRoutes } from './routes.pages'

const Home = lazy(() => import('../../pages/pages/Home'))
const NotFound = lazy(() => import('../../pages/pages/404'))
const Pages = lazy(() => import('../../pages/pages'))
const Components = lazy(() => import('../../pages/components'))

export const AllRoutes: (PartialRouteObject & {
  name: string
  hide?: boolean
})[] = [
  {
    name: 'Home',
    element: <Home />,
    // path: '/404'
    path: '/',
  },
  {
    name: 'NotFound',
    element: <NotFound />,
    path: '/404',
    hide: true,
  },
  {
    name: 'Pages',
    element: <Pages />,
    path: '/pages/*',
    children: PagesRoutes,
  },
  {
    name: 'Components',
    element: <Components />,
    path: '/components/*',
    children: ComponentsRoutes,
  },
]

const getSidebarRoutes = (
  routes: (PartialRouteObject & { name: string })[] = AllRoutes,
  path: string | null = null,
) => {
  return routes
    .filter(r => !('hide' in r && (r as any).hide))
    .map(r => {
      let url = path ? [path, r.path].join('/') : r.path
      if (url.endsWith('/*')) {
        url = r.path.split('').slice(0, -2).join('')
      }
      return {
        name: r.name,
        url: url,
        children: r.children
          ? getSidebarRoutes(
              r.children as (PartialRouteObject & { name: string })[],
              r.path.split('').slice(0, -1).join(''),
            )
          : null,
      }
    })
}

export const sidebarRoutes = getSidebarRoutes()
