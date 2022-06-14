import React from 'react'

import Box from '@mui/material/Box'
import Spinner from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

export function Loading({ loadingName }: { loadingName?: string }) {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner />
        </Box>
        <Typography variant="h5">
          {loadingName ? `Loading ${loadingName}` : 'Loading...'}
        </Typography>
      </Box>
    </Box>
  )
}

export default Loading
