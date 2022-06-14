import React from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'

export function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
      width="100%"
    >
      <Typography variant="h5" color="text.secondary">
        <CircularProgress sx={{ marginRight: 2 }} /> Loading
      </Typography>
    </Box>
  )
}
