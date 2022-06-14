import React from 'react'
import { _internal_useRightPanel } from '../../hooks/internal.misc'
import { Drawer } from '@mui/material'
import { SxProp } from 'design-system/pattern-utils'

export function RightPanel({
  sx,
  clipHeight,
  desktop = false,
  clip = false,
}: {
  sx: SxProp
  clipHeight?: string | number
  desktop?: boolean
  clip?: boolean
}) {
  const { close, state } = _internal_useRightPanel()

  return (
    <Drawer
      sx={{
        '.MuiDrawer-paper': {
          ...sx,
          paddingTop: desktop && clip ? clipHeight : undefined,
          width: state.activePanel?.width ?? `320px`,
        },
      }}
      anchor="right"
      open={state.isOpen}
      onClose={close}
    >
      {state.activePanel?.component}
    </Drawer>
  )
}
