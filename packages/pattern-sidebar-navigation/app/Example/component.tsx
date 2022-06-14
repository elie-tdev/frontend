import React from 'react'
import { useLocation } from 'react-router'

import SettingsIcon from '@mui/icons-material/Settings'
import { List, Toolbar, Typography } from '@mui/material'

import { NavigationPanel, NavItem, useTriggerFrame } from '../../lib/index'
import { WrappedLink } from './link-component'
import { nav_routes } from './routes'

export const SidebarExample = () => {
  const { pathname } = useLocation()

  return (
    <NavigationPanel
      components={{
        /**
         * Item that only shows up on the root-level frame
         */
        topItemHome: (
          <Toolbar sx={{ padding: 0 }}>
            <Typography variant="h6">BrandLogo</Typography>
          </Toolbar>
        ),
        /**
         * Permanent TopItem
         */
        // topItem: (
        //   <Toolbar sx={{ padding: 0 }}>
        //     <Typography variant="subtitle2">Top Item</Typography>
        //   </Toolbar>
        // ),
        /**
         * Items permanently located at the bottom of the navigation
         */
        bottomItems: <BottomItem />,
      }}
      showTestIds
      items={nav_routes}
      currentUrl={pathname}
      linkComponent={WrappedLink}
    />
  )
}

const BottomItem = () => {
  const triggerFrame = useTriggerFrame()
  const { pathname } = useLocation()

  return (
    <List>
      <NavItem
        title="Settings"
        icon={<SettingsIcon />}
        data-testid="settings-button"
        data-navbutton-test-isactive={pathname.startsWith('/settings')}
        isActive={pathname.startsWith('/settings')}
        onClick={() => triggerFrame('settings')}
      />
    </List>
  )
}
