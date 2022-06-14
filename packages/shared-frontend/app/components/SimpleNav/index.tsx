import React from 'react'
import { useNavigate } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu'
import { IconButton } from '@mui/material'

export const SimpleNav: React.FC<{}> = _props => {
  const navigate = useNavigate()
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigate(-1)
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
    </>
  )
}
