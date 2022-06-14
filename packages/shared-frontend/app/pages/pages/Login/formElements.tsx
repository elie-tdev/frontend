import React from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'

const defaultData = {
  rememberMe: false,
  showPassword: false,
  submitted: false,
  username: {
    value: '',
    touched: false,
  },
  password: {
    value: '',
    touched: false,
  },
}

const FormElements: React.FC<{
  type: 'login' | 'register'
  toggleType: () => void
}> = ({ type, toggleType }) => {
  const theme = useTheme()
  const [value, setValue] = React.useState(defaultData)

  const changeValue = (key: keyof typeof value) => (newValue: any) =>
    setValue({ ...value, [key]: newValue })

  const toggleShowPassword = (e: React.MouseEvent) =>
    changeValue('showPassword')(!value.showPassword)

  const inputProps = (key: 'username' | 'password') => ({
    value: value[key].value,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
      setValue({
        ...value,
        [key]: { ...value[key], value: event.target.value },
      }),
    onBlur: (_e: React.FocusEvent<HTMLInputElement>) =>
      setValue({
        ...value,
        [key]: {
          ...value[key],
          touched: value[key].value !== '' ? true : false,
        },
      }),
  })

  const isError = (
    name: 'username' | 'password',
    checks: [(v: string) => boolean, string][],
  ) => {
    const noError = { error: false, helperText: '' }
    if (type === 'login') return noError
    if (!value[name].touched && !value.submitted) return noError
    if (value[name].value === '' && !value.submitted) return noError

    const errors = checks
      .map(([check, msg]) => (check(value[name].value) ? false : msg))
      .filter(m => typeof m === 'string')

    if (errors.length > 0) return { error: true, helperText: errors[0] }
    return noError
  }

  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <TextField
          label={type === 'login' ? 'Username' : 'Email address'}
          // size='small'
          variant="outlined"
          sx={{
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            width: '100%',
          }}
          {...inputProps('username')}
          {...isError('username', [
            [v => v.length >= 3, 'Username must be over 3 characters long'],
            [v => v.includes('@'), 'Please enter your email address'],
          ])}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...inputProps('password')}
          id="filled-adornment-password"
          type={value.showPassword ? 'text' : 'password'}
          label="Password"
          variant="outlined"
          sx={{
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            width: '100%',
          }}
          {...isError('password', [
            [v => v.length >= 8, 'Password must be longer than 8 characters'],
          ])}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={toggleShowPassword}
                  onMouseDown={e => e.preventDefault()}
                  edge="end"
                >
                  {value.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Box
          // display='flex'
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(value.rememberMe)}
                  color="primary"
                  onChange={(_, v) => changeValue('rememberMe')(v)}
                />
              }
              label={
                type === 'login' ? (
                  'Remember me'
                ) : (
                  <>
                    I understand and accept{' '}
                    <Link href="https://www.bai.com/terms-and-conditions">
                      {"BAI's terms and conditions."}
                    </Link>
                  </>
                )
              }
              sx={{
                width: '100%',
                marginTop: theme.spacing(2),
              }}
            />
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{
                width: '100%',
                marginTop: theme.spacing(2),
              }}
              onClick={() => {
                changeValue('submitted')(true)
              }}
            >
              {type === 'login' ? 'Login' : 'Register'}
            </Button>
          </Box>
          <Box mt={4} display="flex">
            <Link
              color="primary"
              onClick={() => {
                setValue(defaultData)
                toggleType()
              }}
            >
              {type === 'login' ? 'Sign up' : 'Returning User?'}
            </Link>
            <span style={{ marginLeft: 'auto', opacity: 0.8 }}>
              <Link
                style={{ marginRight: 8 }}
                color={'textSecondary'}
                href="https://www.bai.com/terms-and-conditions"
              >
                Terms &amp; Conditions
              </Link>
              <Link
                color={'textSecondary'}
                href="https://www.bai.com/terms-and-conditions"
              >
                Privacy Policy
              </Link>
            </span>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default FormElements
