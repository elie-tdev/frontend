import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export const Buttons = () => {
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
          <Typography variant="h4">Buttons</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Variants</Typography>
        </Grid>
        <ButtonVariants />
        <ButtonVariants color="primary" />
        <ButtonVariants color="secondary" />
        <ButtonVariants color="primary" disabled />
        <Grid item xs={12}>
          <Typography variant="h6">Sizes</Typography>
        </Grid>
        <ButtonSizes size={'small'} />
        <ButtonSizes size={'medium'} />
        <ButtonSizes size={'large'} />
        <Grid item xs={12}>
          <Typography variant="h6">Groupd</Typography>
        </Grid>
        <ButtonGroups />
        <ButtonGroups vertical />
      </Grid>
    </>
  )
}

const ButtonVariants: React.FC<{
  color?: 'primary' | 'secondary'
  disabled?: boolean
}> = props => (
  <Grid item container xs={12}>
    <Grid item xs={2}>
      <Button
        color={props.color}
        variant="contained"
        disabled={props.disabled ? props.disabled : false}
      >
        Contained
      </Button>
    </Grid>
    <Grid item xs={2}>
      <Button
        color={props.color}
        variant="outlined"
        disabled={props.disabled ? props.disabled : false}
      >
        Outlined
      </Button>
    </Grid>
    <Grid item xs={2}>
      <Button
        color={props.color}
        variant="text"
        disabled={props.disabled ? props.disabled : false}
      >
        Text
      </Button>
    </Grid>
  </Grid>
)

const ButtonSizes: React.FC<{
  size: 'large' | 'medium' | 'small'
}> = (props = { size: 'medium' }) => {
  const sizeMap = {
    small: 'Sm',
    medium: 'Md',
    large: 'Lg',
  }
  const size = sizeMap[props.size]
  return (
    <Grid item container xs={12}>
      <Grid item xs={2}>
        <Button color="primary" size={props.size} variant="contained">
          Contained {size}
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button color="primary" size={props.size} variant="outlined">
          Outlined {size}
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button color="primary" size={props.size} variant="text">
          Text {size}
        </Button>
      </Grid>
    </Grid>
  )
}

const ButtonGroups: React.FC<{ vertical?: boolean }> = props => {
  const orient = props.vertical ? 'vertical' : 'horizontal'
  const size = props.vertical ? 'auto' : 12
  const justify = props.vertical ? 'start' : 'center'
  return (
    <Grid item container xs={12} gap={4}>
      <Grid item xs={size} justifyItems={justify}>
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          orientation={orient}
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={size} justifyItems={justify}>
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="contained primary button group"
          orientation={orient}
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={size} justifyItems={justify}>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
          orientation={orient}
        >
          <Button>One</Button>
          <Button>Two</Button>
          <Button>Three</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
