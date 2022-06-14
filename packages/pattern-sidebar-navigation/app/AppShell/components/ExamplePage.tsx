import React from 'react'

import { Box, Card } from '@mui/material'

export const ExamplePage = ({ title }: { title: string }) => {
  return (
    <>
      <Card>
        <Box p={3}>
          <h2>{title}</h2>
        </Box>
      </Card>
    </>
  )
}
