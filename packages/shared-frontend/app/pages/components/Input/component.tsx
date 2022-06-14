import React from 'react'

import { Grid, Typography } from '@mui/material'

import Adornments from './adornments'
// import InputTest from './form'
import Autocomplete from './autocomplete'
import Basic from './basic'
import ErrorState from './error'
import Multiline from './multiline'
import Select from './select'

// import CustomSearch from './smallerInput'

export const Inputs = (): JSX.Element => {
  return (
    <>
      <Grid
        sx={{
          flex: 1,
        }}
        container
        spacing={4}
      >
        <DisplayGroup title="Basic" component={Basic} />
        <DisplayGroup title="Small" component={() => <Basic size="small" />} />
        <DisplayGroup title="Auto-complete" component={Autocomplete} />
        <DisplayGroup title="Error" component={ErrorState} />
        <DisplayGroup title="Multiline" component={Multiline} />
        <DisplayGroup title="Select" component={Select} />
        <DisplayGroup title="Adornments" component={Adornments} />
      </Grid>
    </>
  )
}

function DisplayGroup({
  component: Component,
  title,
}: {
  component: any
  title: string
}) {
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item container xs={12}>
        <Component />
      </Grid>
    </>
  )
}
