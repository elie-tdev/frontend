import React, { ReactElement } from 'react'

import { Button, ButtonProps } from '@mui/material'

import { useUserAuth } from '@hooks/useAuth'
import { useLocation, useNavigate } from 'react-router'

interface PretendLoginButtonProps {
  sx?: ButtonProps['sx']
  afterClick?: () => void
}

export function PretendLoginButton({
  sx,
  afterClick = () => void 0,
}: PretendLoginButtonProps): ReactElement {
  const { loggedIn, setLoggedIn } = useUserAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const attemptedRoute: string | undefined =
    location.state?.attemptedRoute?.pathname ?? undefined

  const handleLogin = () => {
    setLoggedIn(true)
    afterClick()
    if (attemptedRoute) navigate(attemptedRoute)
    else if (location.pathname == '/u/login') {
      navigate('/home')
    }
  }

  const handleLogout = () => {
    setLoggedIn(false)
    afterClick()
    navigate('/home')
  }

  const handleLoginButton = () => {
    if (!loggedIn) {
      handleLogin()
    } else {
      handleLogout()
    }
  }

  const buttonText = loggedIn ? 'Pretend to Sign out' : 'Pretend to Sign in'

  return (
    <Button color="primary" sx={sx} onClick={handleLoginButton}>
      {buttonText}
    </Button>
  )
}
