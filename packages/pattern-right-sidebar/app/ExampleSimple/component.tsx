import React, { PropsWithChildren } from 'react'

import AccountIcon from '@mui/icons-material/AccountCircle'
import { IconButton } from '@mui/material'

import { RightSidebar, usePanel } from '../../lib'

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
    <RightSidebar
      panels={[
        {
          id: 'account',
          title: 'Account',
          panel: <div>This is an example Panel</div>,
          icon: <AccountIcon />,
        },
      ]}
      config={{ width: 320 }}
    >
      {children}
    </RightSidebar>
  )
}

/**
 * Used within app shell as buttons to trigger RightSidePanel open/close
 */
export const RightSidePanelTriggers = () => {
  const { openPanel } = usePanel()

  return (
    <IconButton color="secondary" onClick={openPanel('account')}>
      <AccountIcon />
    </IconButton>
  )
}
