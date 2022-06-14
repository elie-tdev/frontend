import React from 'react'
import { LayoutBase } from '@components/LayoutBase'
import { Typography } from '@mui/material'

export default function HomePage() {
  return (
    <LayoutBase title="Home">
      <Typography variant="subtitle1">Welcome to the homepage!</Typography>
    </LayoutBase>
  )
}
