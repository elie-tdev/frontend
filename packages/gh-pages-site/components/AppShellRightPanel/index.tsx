import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
// MUI components
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Theme,
} from '@mui/material'

// AppShell exports
import { useRightPanel } from 'design-system/pattern-app-shell'
import { PretendLoginButton } from '@components/PretendLoginButton'

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
const AppShellRightPanel = ({
  title,
  bodyText = undefined,
  body = undefined,
}: {
  title: string
  bodyText?: string
  body?: NonNullable<React.ReactNode>
}) => {
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
        {bodyText && <Typography align="center">{bodyText}</Typography>}
        {body && <>{body}</>}
      </Box>
    </>
  )
}

export const RightPanelPrimary = () => (
  <AppShellRightPanel
    title="Notifications"
    bodyText="This is the right panel integrated into the app shell!"
  />
)
export const RightPanelSecondary = () => {
  const { handleClose } = useRightPanel()
  return (
    <AppShellRightPanel
      title="Your Account"
      body={
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography align="center" gutterBottom>
            This is the right panel integrated into the app shell!
          </Typography>
          <PretendLoginButton
            afterClick={handleClose}
            sx={{ marginY: 2, width: 'auto' }}
          />
        </Box>
      }
    />
  )
}

export enum RightPanelNames {
  PRIMARY = 'right_panel_notifications',
  SECONDARY = 'right_panel_account',
}
