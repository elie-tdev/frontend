import React from 'react'

import { Box, Grid, Slider, Typography, useTheme } from '@mui/material'

export const Sliders = () => {
  const theme = useTheme()
  const marks = [
    {
      value: 0,
    },
    {
      value: 20,
    },
    {
      value: 37,
    },
    {
      value: 100,
    },
  ]
  const marksTemp = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ]
  return (
    <>
      <Grid
        sx={{
          flex: 1,
        }}
        container
        spacing={4}
      >
        <Grid item xs={12}>
          <Typography variant="h4">Sliders</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Variants</Typography>
        </Grid>
        <Grid item container xs={12}>
          <Slider
            size="small"
            defaultValue={60}
            marks={marks}
            valueLabelDisplay="auto"
          />
          <Box sx={{ height: theme.spacing(6) }} />
          <Slider
            size="small"
            defaultValue={60}
            marks={marksTemp}
            valueLabelDisplay="auto"
          />
          <Box sx={{ height: theme.spacing(6) }} />
          <Slider
            size="medium"
            defaultValue={60}
            marks={marks}
            valueLabelDisplay="auto"
          />
          <Box sx={{ height: theme.spacing(6) }} />
          <Slider
            size="medium"
            defaultValue={60}
            marks={marksTemp}
            valueLabelDisplay="auto"
          />
          <Box sx={{ marginBottom: 4, marginTop: 4 }}>
            <Typography variant="h6">Vertical</Typography>
          </Box>
          <Box sx={{ height: 300, width: '100%' }}>
            <Slider
              orientation="vertical"
              defaultValue={30}
              marks={marksTemp}
              valueLabelDisplay="auto"
              aria-labelledby="vertical-slider"
              sx={{
                height: 300,
              }}
            />
          </Box>
          <Box sx={{ height: theme.spacing(6) }} />
        </Grid>
      </Grid>
    </>
  )
}
