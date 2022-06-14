import React from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications'
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material'

import { useRightPanel } from 'design-system/pattern-app-shell'
import { ThemeToggleButton } from '@components/ThemeButton'
import { RightPanelNames } from '@components/AppShellRightPanel'
import { useUserAuth } from '@hooks/useAuth'
import { PretendLoginButton } from '@components/PretendLoginButton'

const toggleButtonStyles = {
  border: 0,
  marginX: 1,
  minWidth: 48,
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

/**
 * This is going to be what we place inside of the Appbar of our
 * AppShell. It'll go within the 'components.appbarContents' slot
 * of our AppShell implementation.
 */
export const AppShellHeader = () => {
  const { loggedIn } = useUserAuth()
  const { isOpen, currentPanel, handleOpen } = useRightPanel()
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  const handleRightPanel = (_element: any, value: any) => handleOpen(value)()

  const avatarItem = (
    <Avatar
      variant="circular"
      sx={{
        width: 32,
        height: 32,
        fontSize: 14,
      }}
    >
      JA
    </Avatar>
  )

  const toggleButtons = loggedIn ? (
    <StyledToggleButtonGroup
      value={isOpen ? currentPanel : null}
      exclusive
      onChange={handleRightPanel}
      aria-label="text alignment"
      size="small"
    >
      <ToggleButton
        value={RightPanelNames.PRIMARY}
        aria-label="notification sidebar"
        sx={toggleButtonStyles}
      >
        <NotificationsIcon />
      </ToggleButton>
      <ToggleButton
        value={RightPanelNames.SECONDARY}
        aria-label="account sidebar"
        sx={toggleButtonStyles}
      >
        {avatarItem}
      </ToggleButton>
    </StyledToggleButtonGroup>
  ) : (
    <PretendLoginButton />
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
          {toggleButtons}
        </Box>
      )}
      {isMobile && <Box>{toggleButtons}</Box>}
    </Box>
  )
}
