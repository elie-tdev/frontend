import React from 'react'

// Simple Button that we use in examples to change the theme
import { ThemeToggleButton } from '../../app/Theme'

// React router
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'

// Icons
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsIcon from '@mui/icons-material/Notifications'
import CloseIcon from '@mui/icons-material/Close'
// MUI components
import {
  Box,
  List,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  useMediaQuery,
  Theme,
} from '@mui/material'

// AppShell exports
import {
  NavItem,
  useTriggerFrame,
  useRightPanel,
  createLinkComponent,
} from 'design-system/pattern-app-shell'

/**
 * This will take props, so that it can be one or more of the
 * RightPanels that we use within our AppShell.
 *
 * Of course, you can just use different components, too.
 *
 * One thing to note is that because these components sit at the top
 * of app, if you wish for these components to be dynamic, you'll need to
 * either use a context, or some other non-props based state-management
 * solution (redux, react-query, apollo, etc).
 */
const RightPanel = ({ title, body }: { title: string; body: string }) => {
  const { handleClose } = useRightPanel()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  return (
    <>
      <Toolbar
        sx={{
          backgroundColor: 'transparent',
          border: '1px solid transparent',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant={isMobile ? 'h5' : 'subtitle1'}>{title}</Typography>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Toolbar>
      <Box
        display="flex"
        height="100%"
        maxWidth="72ch"
        justifyContent="center"
        alignItems="center"
      >
        <Typography align="center">{body}</Typography>
      </Box>
    </>
  )
}

/**
 * This is going to be what we place inside of the Appbar of our
 * AppShell. It'll go within the 'components.appbarContents' slot
 * of our AppShell implementation.
 */
const AppbarContents = () => {
  const { isOpen, currentPanel, handleOpen } = useRightPanel()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const mapping = {
    main_right_panel: 0,
    secondary_right_panel: 1,
    0: 'main_right_panel',
    1: 'secondary_right_panel',
  }

  const tabValue =
    currentPanel === null || !isOpen ? false : (mapping as any)[currentPanel]

  const onTabChange = (_event: any, value: any) => {
    if (value in mapping) {
      handleOpen((mapping as any)[value])()
    }
  }

  const avatarItem = (
    <Avatar
      variant="circular"
      sx={{
        width: 32,
        height: 32,
        fontSize: 14,
        marginRight: isMobile ? 0 : 1,
      }}
    >
      JA
    </Avatar>
  )

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexGrow={1}
    >
      <Typography noWrap variant="h5">
        Application Title
      </Typography>
      {!isMobile && (
        <Box display="flex" alignItems="center">
          <ThemeToggleButton sx={{ maxHeight: 40 }} />
          <Tabs
            scrollButtons={false}
            value={tabValue}
            onChange={onTabChange}
            role="group"
          >
            <Tab
              label={<NotificationsIcon />}
              role="button"
              aria-label="open notificiations"
            />
            <Tab
              label={
                <Box display="flex" gap={1} alignItems="center">
                  {avatarItem}
                  <Typography>J. Appleseed</Typography>
                </Box>
              }
              role="button"
              aria-label="open profile"
            />
          </Tabs>
        </Box>
      )}
      {isMobile && (
        <Box>
          <IconButton onClick={handleOpen('main_right_panel')}>
            <NotificationsIcon />
          </IconButton>
          <IconButton onClick={handleOpen('secondary_right_panel')}>
            {avatarItem}
          </IconButton>
        </Box>
      )}
    </Box>
  )
}

/**
 * This is the bottom item for the sidebar, we're going to be using
 * this to show a hidden panel within the sidebar.
 *
 * You can read more about this in the sidebar docs regarding
 * 'hidden panels'.
 *
 * https://github.com/swt-xd/Shared-Frontend/wiki/Sidebar-Navigation-Hidden-Routes
 */
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

/**
 * This component makes the default link from
 * React Router Dom act like a normal anchor tag.
 *
 * You can read more about it in this paragrapn of the sidebar-
 * navigaiton docs.
 *
 * https://github.com/swt-xd/Shared-Frontend/wiki/Sidebar-Navigation-Getting-Started#setup-link-componenttsx
 */
export const WrappedLink = createLinkComponent<HTMLAnchorElement>(
  (props, ref) => {
    return <Link to={props.href} ref={ref} {...props} />
  },
)

export const Components = {
  RightPanel: {
    Primary: () => (
      <RightPanel
        title="Main Right Panel"
        body="This is the right panel triggered by 'main_right_panel'!"
      />
    ),
    Secondary: () => (
      <RightPanel
        title="Secondary Right Panel"
        body="This is the right panel triggered by 'secondary_right_panel'!"
      />
    ),
  },
  AppbarContents,
  BottomItem,
  WrappedLink,
}
