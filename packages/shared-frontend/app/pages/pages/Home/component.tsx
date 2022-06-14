import React from 'react'

import { Box, Card } from '@mui/material'

import { Layout } from '../../../components/Layout'

export const Home = () => {
  return (
    <Layout>
      <Card>
        <Box p={3}>
          <h2>Hello Home</h2>
        </Box>
      </Card>
    </Layout>
  )
}
