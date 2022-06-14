import React, { useState } from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material'

import { useCreateRoutesNavItems } from 'design-system/utils-react-router'
import {
  AppShell,
  NavigationTopBar,
} from 'design-system/pattern-app-shell'

import { navRoutes } from '../shared/nav-routes'
import { Components } from '../shared/components'
import ExampleLogo from '../shared/logo'
import { useUserAuthStatus } from '../shared/useAuth'

export function AppShellExample() {
  const [routeObjs, sidebarItems] = useCreateRoutesNavItems({
    // Wrappers you may want to use in routes
    layouts: {
      example: (props: any) => <div>{props.children}</div>,
    },
    // The route tree, modified to unify the needs of app-shell and react-router
    routes: navRoutes,
    // A hook which any `authCheck`s in individual `route`s will recieve. Will
    // allow your custom `authChecks` to redirect to, e.g. a login page, if the
    // check does not pass. (See the simple example for an explicit explainer).
    useUserAuthStatus,
  })

  const routes = useRoutes(routeObjs) // passing in the first part of our result
  const { pathname: currentUrl } = useLocation()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <AppShell
      components={{
        appbarContents: <Components.AppbarContents />,
        sidebarTopItem: (
          <NavigationTopBar>
            <Box flexGrow={1} display="flex" justifyContent="center">
              <ExampleLogo />
            </Box>
          </NavigationTopBar>
        ),
        sidebarBottomItems: <Components.BottomItem />,
        rightPanels: [
          {
            name: 'main_right_panel',
            width: isMobile ? '100%' : 320,
            component: <Components.RightPanel.Primary />,
          },
          {
            name: 'secondary_right_panel',
            width: isMobile ? '100%' : 320,
            component: <Components.RightPanel.Secondary />,
          },
        ],
      }}
      clipRightDrawer={true}
      currentUrl={currentUrl}
      linkComponent={Components.WrappedLink}
      sidebarItems={sidebarItems}
    >
      {routes}
    </AppShell>
  )
}
