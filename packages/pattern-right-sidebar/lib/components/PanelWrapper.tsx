import React from 'react'

import { CloseOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'

import { usePanelInternal } from '../hooks'
import { PanelBase } from '../types'

/**
 * Wrapper that goes around each panel
 */
export const PanelWrapper = ({ panelData }: { panelData: PanelBase }) => {
  const { panelSettings, closeDrawer } = usePanelInternal()
  return (
    <Box width={panelSettings.width}>
      {panelSettings.disableTitle !== true && (
        <Box
          paddingX={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {typeof panelData.title === 'string' && (
            <Typography variant="h6">{panelData.title}</Typography>
          )}
          {typeof panelData.title !== 'string' && <>{panelData.title}</>}
          <IconButton onClick={closeDrawer}>
            <CloseOutlined />
          </IconButton>
        </Box>
      )}
      {panelData.panel}
    </Box>
  )
}
