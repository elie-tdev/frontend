import React from 'react'
import { Box, Button, ButtonProps, Typography } from '@mui/material'
import { useUserAuthStatus, useUserAuth } from '../shared/useAuth'
import { WrappedLink } from '../shared/components'
import { useNavigate } from 'react-router-dom'

/** Utility to help us create pages */
export const mkComponent = (name: string, other: React.ReactNode = null) => (
  <Box padding={2} border="1px solid black">
    <Typography>{name.toUpperCase().charAt(0) + name.slice(1)}</Typography>
    {other && <Box py={2}>{other}</Box>}
  </Box>
)

export const LinkButton = (props: ButtonProps) => (
  <Button component={WrappedLink as any} {...props} />
)

export const Nav = () => {
  const { loggedIn, setLoggedIn } = useUserAuth()
  const navigate = useNavigate()
  return (
    <Box padding={2} display="flex" gap={2}>
      <LinkButton href="/home">Home</LinkButton>
      <LinkButton href="/private">Private</LinkButton>
      {!loggedIn && <LinkButton href="/sign-in">Go Sign In</LinkButton>}
      <LinkButton href="/parent/child">Child</LinkButton>
      {loggedIn && (
        <Button
          onClick={() => {
            setLoggedIn(false)
            navigate('/sign-in')
          }}
        >
          Sign Out
        </Button>
      )}
    </Box>
  )
}

export { useUserAuthStatus, useUserAuth }
