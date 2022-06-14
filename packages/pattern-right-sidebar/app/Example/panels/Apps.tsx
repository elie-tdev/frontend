import React from 'react'

import { Box, List, ListItemButton } from '@mui/material'

import { usePanelData } from './index.types'

export const AppsPanel = () => {
  const { data } = usePanelData('apps')
  return (
    <Box>
      <List>
        {data.map((d, i) => (
          <ListItemButton key={`account-item-${i}`}>{d.title}</ListItemButton>
        ))}
      </List>
    </Box>
  )
}
