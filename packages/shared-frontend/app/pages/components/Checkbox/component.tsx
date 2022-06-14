import React from 'react'

import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material'

export const Checkboxes = () => {
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
          <Typography variant="h4">Checkboxes</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Variants</Typography>
        </Grid>
        <Grid item container xs={12}>
          <CheckboxVariants />
          <CheckboxVariants color="primary" />
          <CheckboxVariants color="secondary" />
          <CheckboxVariants color="primary" disabled />
          <CheckboxVariants color="primary" label />
          <CheckboxVariants color="secondary" label />
          <CheckboxVariants color="primary" disabled label />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Small</Typography>
        </Grid>
        <Grid item container xs={12}>
          <CheckboxVariants size="small" />
          <CheckboxVariants size="small" color="primary" />
          <CheckboxVariants size="small" color="secondary" />
          <CheckboxVariants size="small" color="primary" disabled />
          <CheckboxVariants size="small" color="primary" label />
          <CheckboxVariants size="small" color="secondary" label />
          <CheckboxVariants size="small" color="primary" disabled label />
        </Grid>
      </Grid>
    </>
  )
}

const CheckboxVariants: React.FC<{
  color?: 'primary' | 'secondary'
  size?: 'small' | 'medium'
  disabled?: boolean
  label?: boolean
}> = mainProps => {
  const props = Object.assign(
    { color: undefined, disabled: false, label: false, size: 'medium' },
    mainProps,
  )
  const { label, ...propsList } = props
  const Cbox = checkboxItemGen(propsList)
  return (
    <Grid item container xs={12}>
      <Cbox
        defaultChecked
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        disabled={props.disabled ? true : false}
        label={label ? 'First Item' : undefined}
        size={props.size}
      />
      <Cbox
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        disabled={props.disabled ? true : false}
        label={label ? 'Second Item' : undefined}
        size={props.size}
      />
      <Cbox
        indeterminate={true}
        checked={false}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        disabled={props.disabled ? true : false}
        label={label ? 'Second Item' : undefined}
        size={props.size}
      />
      <Cbox
        defaultChecked
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        disabled={props.disabled ? true : false}
        label={label ? 'Third Item' : undefined}
        size={props.size}
      />
      <Cbox
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        disabled={props.disabled ? true : false}
        label={label ? 'Fourth Item' : undefined}
        size={props.size}
      />
    </Grid>
  )
}

const checkboxItemGen: (data: {
  disabled?: boolean
  color?: 'primary' | 'secondary'
}) => React.FC<CheckboxProps & { label?: string }> = data => props => {
  const disabled = data.disabled ? true : false
  const color = data.color ? data.color : 'default'
  const Cb = <Checkbox {...props} disabled={disabled} color={color} />
  if (props.label) {
    return <FormControlLabel control={Cb} label={props.label} />
  }
  return Cb
}
