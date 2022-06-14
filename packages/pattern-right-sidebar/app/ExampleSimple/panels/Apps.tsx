import React from 'react'

import { Box, List, ListItemButton } from '@mui/material'

import { useExamplePanel } from './Context.Panels'

export const AppsPanel = () => {
  const { data } = useExamplePanel('apps')
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
