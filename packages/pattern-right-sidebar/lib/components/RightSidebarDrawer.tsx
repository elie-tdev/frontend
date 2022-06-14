import React, { useMemo } from 'react'

import { alpha, Drawer, IconButton, Toolbar, useTheme } from '@mui/material'

import { usePanelInternal } from '../hooks'

/**
 * The main Drawer used for the RightSidebar
 */
export function RightSidebarDrawer() {
  const {
    closeDrawer,
    drawerIsOpen,
    focusedPanel,
    openPanel,
    panels,
    panelSettings,
  } = usePanelInternal()

  const muiTheme = useTheme()

  const currentPanel = useMemo(
    () => panels.find(p => p.id === focusedPanel),
    [focusedPanel, panels],
  )

  const selectedStateColor: string = alpha(muiTheme.palette.primary.light, 0.2)

  return (
    <Drawer
      anchor="right"
      open={drawerIsOpen}
      onClose={closeDrawer}
      sx={panelSettings.drawerSx ?? {}}
    >
      {panelSettings.disableIcons !== true && (
        <Toolbar
          sx={{
            justifyContent: 'flex-end',
            gap: 2,
          }}
        >
          {panels.map((panelData, i) => {
            const sxProps =
              panelData.id === focusedPanel
                ? { backgroundColor: selectedStateColor }
                : {} // handle setting selected icon state

            return (
              <IconButton
                sx={sxProps}
                key={`panel-icon-button-trigger-${i}`}
                onClick={openPanel(panelData.id)}
              >
                {panelData.icon ? panelData.icon : panelData.title}
              </IconButton>
            )
          })}
        </Toolbar>
      )}
      {currentPanel && currentPanel.panel}
    </Drawer>
  )
}
