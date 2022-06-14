import React from 'react'

import { Box, List, ListItemButton } from '@mui/material'

import { usePanelData } from './index.types'

export const AccountPanel = () => {
  const { data } = usePanelData('account')

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
