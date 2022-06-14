import React, { useMemo } from 'react'
import {
  AppShell,
  NavigationTopBar,
  useRightPanel,
} from 'design-system/pattern-app-shell'
import { useLocation } from 'react-router'

import { Box, Button, Theme, Typography, useMediaQuery } from '@mui/material'

import { Components } from '../shared/components'
import { navRoutes } from '../shared/nav-routes'
import ExampleLogo from '../shared/logo'

export const SimpleExample = () => {
  const { pathname } = useLocation()
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
      currentUrl={pathname}
      linkComponent={Components.WrappedLink}
      sidebarItems={navRoutes}
    >
      <PageContent />
    </AppShell>
  )
}

const PageContent = () => {
  const { handleOpen } = useRightPanel()
  const { pathname } = useLocation()

  // You shouldn't do this. Just use your router for defining pages, as
  // it's compatible with suspense, etc.
  //
  // This is just to quickly show the path for a current page
  // so we don't have to setup a whole router config.
  const getName = useMemo(() => {
    const capitalize = (s: string) =>
      s.charAt(0).toUpperCase() + s.split('').slice(1).join('')
    if (pathname === '/') {
      return 'Just Started'
    }
    return pathname
      .split('/')
      .filter(section => section !== '')
      .map(pathSection =>
        pathSection.includes('-')
          ? pathSection.split('-').map(capitalize).join(' ')
          : capitalize(pathSection),
      )
      .join(' > ')
  }, [pathname])

  return (
    <Box
      display="flex"
      justifyContent="flexStart"
      paddingTop="10%"
      alignItems="center"
      height="100%"
      maxWidth="68ch"
      margin="auto"
      flexDirection="column"
    >
      <Typography variant="h4">Debug Route:</Typography>
      <Typography variant="h5" color="secondary" sx={{ marginBottom: '24px' }}>
        ({getName})
      </Typography>
      <br />
      <Typography align="center" variant="body1" sx={{ marginY: '24px' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, error.
        Quae minus cum laboriosam dolore eligendi ea a eveniet fugiat,
        consequatur, nam accusantium, consequuntur vel impedit dicta quod
        cupiditate rerum.
      </Typography>
      <br />
      <Button onClick={handleOpen('main_right_panel')}>
        Open Right Panel (main)
      </Button>
      <br />
      <Button onClick={handleOpen('secondary_right_panel')}>
        Open Right Panel (secondary)
      </Button>
    </Box>
  )
}
