import React from 'react'
import { useRoutes, useLocation } from 'react-router-dom'
import { Box, Theme, useMediaQuery } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import { useCreateRoutesNavItems } from 'design-system/utils-react-router'
import {
  AppShell,
  NavigationTopBar,
} from 'design-system/pattern-app-shell'

import { Link } from '@components/Link'
import { AppShellHeader } from '@components/AppShellHeader'
import {
  RightPanelPrimary,
  RightPanelSecondary,
  RightPanelNames,
} from '@components/AppShellRightPanel'
import { navRoutes } from '@components/Router'
import { useUserAuthStatus } from '@hooks/useAuth'
import ExampleLogo from './logo'

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
        appbarContents: <AppShellHeader />,
        sidebarTopItem: (
          <NavigationTopBar>
            <Box flexGrow={1} display="flex" justifyContent="center">
              <Link href="/home">
                <ExampleLogo />
                <Box sx={visuallyHidden}>Logo (home link)</Box>
              </Link>
            </Box>
          </NavigationTopBar>
        ),
        // sidebarBottomItems: <Components.BottomItem />,
        rightPanels: [
          {
            name: RightPanelNames.PRIMARY,
            width: isMobile ? '100%' : 320,
            component: <RightPanelPrimary />,
          },
          {
            name: RightPanelNames.SECONDARY,
            width: isMobile ? '100%' : 320,
            component: <RightPanelSecondary />,
          },
        ],
      }}
      clipRightDrawer={true}
      currentUrl={currentUrl}
      linkComponent={Link as any}
      sidebarItems={sidebarItems}
    >
      {routes}
    </AppShell>
  )
}
