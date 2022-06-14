import React from 'react'

import CloseIcon from '@mui/icons-material/Close'
import { Toolbar, IconButton, useTheme } from '@mui/material'
import type { SxProp } from 'design-system/pattern-utils'
import { useBreakpoints, useLeftPanel } from '../../hooks/internal.misc'

export const NavigationTopBar = ({
  sxProps = {},
  alwaysShowDesktop,
  onClose,
  children,
}: React.PropsWithChildren<{
  onClose?: () => void
  alwaysShowDesktop?: boolean
  sxProps?: {
    toolbar?: SxProp
    iconButton?: SxProp
    icon?: SxProp
  }
}>) => {
  const [device] = useBreakpoints()
  const [_, setOpen] = useLeftPanel()
  const theme = useTheme()
  const styles = {
    toolbar: {},
    iconButton: {},
    icon: {},
    ...sxProps,
  }

  const handleClick = onClose ? onClose : () => setOpen(false)

  if ((device === 'mobile' || device === 'tablet') && !alwaysShowDesktop) {
    return (
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[900]
              : theme.palette.grey[50],
          marginBottom: 2,
          ...styles.toolbar,
        }}
      >
        {children}
        <IconButton sx={styles.iconButton} onClick={handleClick}>
          <CloseIcon sx={styles.icon} />
        </IconButton>
      </Toolbar>
    )
  }

  return (
    <>
      <Toolbar sx={styles.toolbar}>{children}</Toolbar>
    </>
  )
}
