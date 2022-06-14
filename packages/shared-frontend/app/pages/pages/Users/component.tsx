import React from 'react'

import { Box, Card } from '@mui/material'

import { Layout } from '../../../components/Layout'

export const Users = () => {
  return (
    <Layout>
      <Card>
        <Box p={3}>
          <h2>Hello Users</h2>
        </Box>
      </Card>
    </Layout>
  )
}
