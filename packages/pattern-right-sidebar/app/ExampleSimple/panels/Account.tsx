import React, { ReactNode } from 'react'

import { Box, List, ListItemButton } from '@mui/material'

import { useExamplePanel } from './Context.Panels'

export const AccountPanel = () => {
  const { data } = useExamplePanel('account')

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
