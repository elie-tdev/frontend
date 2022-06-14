import React from 'react'

import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from '@mui/material'

export const Switches = () => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

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
          <Typography variant="h4">Switches</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Variants</Typography>
        </Grid>
        <Grid item container xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="secondary"
                />
              }
              label="Secondary"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label="Primary"
            />
            <FormControlLabel control={<Switch />} label="Uncontrolled" />
            <FormControlLabel disabled control={<Switch />} label="Disabled" />
            <FormControlLabel
              disabled
              control={<Switch checked />}
              label="Disabled"
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Small</Typography>
        </Grid>
        <Grid item container xs={12}>
          <FormGroup row>
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="secondary"
                  size="small"
                />
              }
              label="Secondary"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                  size="small"
                />
              }
              label="Primary"
            />
            <FormControlLabel
              control={<Switch size="small" />}
              label="Uncontrolled"
            />
            <FormControlLabel
              disabled
              control={<Switch size="small" />}
              label="Disabled"
            />
            <FormControlLabel
              disabled
              control={<Switch checked size="small" />}
              label="Disabled"
            />
          </FormGroup>
        </Grid>
      </Grid>
    </>
  )
}
