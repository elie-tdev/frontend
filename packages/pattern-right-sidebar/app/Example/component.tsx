import React, { PropsWithChildren } from 'react'

import AccountIcon from '@mui/icons-material/AccountCircle'
import { Box, IconButton, Theme, useMediaQuery } from '@mui/material'

import { RightSidebar, usePanel } from '../../lib'
import { Panels } from './panels'
import { PanelProvider } from './panels/index.types'

/**
 * ============================================================
 * Note:
 *   See how these components are used in the app by looking
 *   at (AppShell)[../AppShell/component.tsx]
 * ============================================================
 */

/**
 * Wraps the whole application to provide the RightPanel Navigation
 */
export const RightSidePanelProvider = ({ children }: PropsWithChildren<{}>) => {
  return (
    <PanelProvider>
      <RightSidebar panels={Panels} config={{ width: 320 }}>
        {children}
      </RightSidebar>
    </PanelProvider>
  )
}

/**
 * Re-export:
 *
 *  Will let us update panel's contents from deeper in the application tree
 */
export { usePanelData } from './panels/index.types'

/**
 * Used within app shell as buttons to trigger RightSidePanel open/close
 */
export const RightSidePanelTriggers = () => {
  const { openPanel } = usePanel()
  const isDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <Box
      display="flex"
      // hardcoded for right panel nav buttons to float right
      justifyContent="flex-end"
      gap={1}
    >
      {isDesktop &&
        Panels.map(p => (
          <IconButton
            color="secondary"
            key={`panel-trigger-${p.id}`}
            onClick={openPanel(p.id)}
          >
            {p.icon ? p.icon : p.title}
          </IconButton>
        ))}

      {!isDesktop && (
        <IconButton color="secondary" onClick={openPanel('account')}>
          <AccountIcon />
        </IconButton>
      )}
    </Box>
  )
}
