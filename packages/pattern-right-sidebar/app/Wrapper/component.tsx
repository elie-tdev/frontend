import React from 'react'

import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'

import type { ReactNode } from 'react'

const drawerWidth = 240

export interface WrapperProps {
  /**
   * @description If loading this in a shadow-dom or an IFrame, it's best to set this variable to the current window(global), so that the mobile drawer is able to detect size/width changes correctly.
   */
  container?: HTMLElement
  /**
   * @description The sidebar content that you'd like to use
   */
  sidebar?: NonNullable<ReactNode> | null
  /**
   * @description The topbar content you'd like to use
   */
  topbar?: NonNullable<ReactNode> | null
  /**
   * @description The title to show as the title in the topbar
   */
  title?: NonNullable<ReactNode> | string | null
}

export function Wrapper({
  container = undefined,
  sidebar = null,
  title = null,
  topbar = null,
  children,
}: React.PropsWithChildren<WrapperProps>) {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const Sidebar = sidebar ?? <></>
  const Title = title ? (
    <Typography variant="h6" noWrap component="div">
      {title}
    </Typography>
  ) : (
    <></>
  )
  const Topbar = topbar ?? <></>
  const darkMode = theme.palette.mode === 'dark'
  const paperBackground = darkMode
    ? theme.palette.background.paper
    : theme.palette.grey[50]
  const toolbarBackground = darkMode
    ? theme.palette.background.paper
    : theme.palette.grey[50]
  const sidebarBackground = theme.palette.background.paper

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderRight: 'none',
          borderLeft: 'none',
          borderTop: 'none',
          borderBottom: 'none',
          backgroundColor: toolbarBackground,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {Title}
          {Topbar}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: sidebarBackground,
            },
          }}
        >
          {Sidebar}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: darkMode ? `1px solid ${theme.palette.divider}` : 'none',
              backgroundColor: sidebarBackground,
            },
          }}
          open
        >
          {Sidebar}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: paperBackground,
          height: '100%',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}
