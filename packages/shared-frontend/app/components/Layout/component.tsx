import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu'
import { Button } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
// import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import useMuiTheme from '@mui/material/styles/useTheme'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import { sidebarRoutes } from '../../components/Router/routes.all'
import useTheme from '../../hooks/useTheme'

const drawerWidth = 240

const DrawerItem = ({
  name,
  url,
  childItems,
}: {
  name: string
  url: string
  childItems?: any[]
}) => {
  return (
    <>
      {!childItems && (
        <ListItem
          key={name}
          component={RouterLink}
          to={url}
          sx={{
            borderRadius: 1,
          }}
          button
        >
          <ListItemText
            primary={
              <Typography variant="button" color="textPrimary">
                {name}
              </Typography>
            }
          />
        </ListItem>
      )}
      {childItems && (
        <>
          <ListItem key={name}>
            <ListItemText
              primary={
                <Typography variant="overline" color="textSecondary">
                  {name}
                </Typography>
              }
            />
          </ListItem>
          <List sx={{ paddingLeft: 2 }}>
            {childItems.map(child => (
              <DrawerItem
                key={`${name}-${child.name}`}
                name={child.name}
                url={child.url}
                childItems={child.children as unknown as any}
              />
            ))}
          </List>
        </>
      )}
    </>
  )
}

export const Layout = (props: React.PropsWithChildren<{}>): JSX.Element => {
  const theme = useMuiTheme()
  const { toggle: toggleTheme, type: themeType } = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Box sx={theme.mixins.toolbar} />
      <List sx={{ paddingLeft: 1, paddingRight: 1 }}>
        {sidebarRoutes.map(({ name, url, children }: any) => (
          <DrawerItem key={url} name={name} url={url} childItems={children} />
        ))}
      </List>
    </div>
  )

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          borderLeft: '0',
          borderRight: '0',
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
          <Typography variant="h6" noWrap>
            Design System
          </Typography>
          <Button
            color="inherit"
            sx={{ marginLeft: 'auto' }}
            onClick={toggleTheme}
          >
            {themeType === 'light' ? 'Dark Theme' : 'Light Theme'}
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="Application Pages"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          position: 'relative',
          padding: theme.spacing(4),
        }}
      >
        <Box sx={theme.mixins.toolbar} />
        {props.children}
      </Box>
    </Box>
  )
}
