import * as React from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

export default function FormPropsTextFields({
  size = 'medium',
}: {
  size: 'small' | 'medium'
}) {
  const makeId = (id: string) => `${id}-${size}`

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          variant="outlined"
          id={makeId('outlined-required')}
          size={size}
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          disabled
          variant="outlined"
          id={makeId('outlined-disabled')}
          size={size}
          label="Disabled"
          defaultValue="Hello World"
        />
        <TextField
          id={makeId('outlined-password-input')}
          variant="outlined"
          size={size}
          color="secondary"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id={makeId('outlined-read-only-input')}
          variant="outlined"
          size={size}
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id={makeId('outlined-number')}
          variant="outlined"
          size={size}
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id={makeId('outlined-search')}
          variant="outlined"
          size={size}
          label="Search field"
          type="search"
        />

        <TextField
          id={makeId('outlined-helperText')}
          variant="outlined"
          size={size}
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
      <div>
        <TextField
          required
          id={makeId('filled-required')}
          size={size}
          label="Required"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          disabled
          id={makeId('filled-disabled')}
          size={size}
          label="Disabled"
          defaultValue="Hello World"
          variant="filled"
        />
        <TextField
          id={makeId('filled-password-input')}
          size={size}
          color="secondary"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
        />
        <TextField
          id={makeId('filled-read-only-input')}
          size={size}
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="filled"
        />
        <TextField
          id={makeId('filled-number')}
          size={size}
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
        <TextField
          id={makeId('filled-search')}
          size={size}
          label="Search field"
          type="search"
          variant="filled"
        />
        <TextField
          id={makeId('filled-helperText')}
          size={size}
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="filled"
        />
      </div>
      <div>
        <TextField
          required
          id={makeId('standard-required')}
          size={size}
          label="Required"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          disabled
          id={makeId('standard-disabled')}
          size={size}
          label="Disabled"
          defaultValue="Hello World"
          variant="standard"
        />
        <TextField
          id={makeId('standard-password-input')}
          size={size}
          color="secondary"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id={makeId('standard-read-only-input')}
          size={size}
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
        <TextField
          id={makeId('standard-number')}
          size={size}
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <TextField
          id={makeId('standard-search')}
          size={size}
          label="Search field"
          type="search"
          variant="standard"
        />
        <TextField
          id={makeId('standard-helperText')}
          size={size}
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
          variant="standard"
        />
      </div>
    </Box>
  )
}
