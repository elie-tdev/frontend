import React from 'react'

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  RadioProps,
  Typography,
} from '@mui/material'

export const Radios = () => {
  const [value, setValue] = React.useState('female')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value)
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
          <Typography variant="h4">Radio</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Variants</Typography>
        </Grid>
        <Grid item container xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="female"
                control={<RadioButton />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<RadioButton />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<RadioButton />}
                label="Other"
              />
              <FormControlLabel
                value="disabled"
                disabled
                control={<RadioButton />}
                label="(Disabled option)"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </>
  )
}

const RadioButton: React.FC<RadioProps> = props => {
  return <Radio {...props} />
}
