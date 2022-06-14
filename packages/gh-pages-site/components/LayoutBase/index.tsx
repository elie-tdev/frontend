import React from 'react'
import { Box, Divider, Typography } from '@mui/material'

export interface LayoutBaseProps {
  title: string
  children?: React.ReactNode
}

export function LayoutBase(props: LayoutBaseProps) {
  return (
    <Box display="block" position="relative" paddingX={4} paddingY={6}>
      <Typography variant="h2" gutterBottom>
        {props.title}
      </Typography>
      <Divider />
      <Box display="block" paddingTop={2}>
        {props.children}
      </Box>
    </Box>
  )
}
