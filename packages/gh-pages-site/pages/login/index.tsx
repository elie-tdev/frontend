import React from 'react'
import { NoShell } from 'design-system/pattern-app-shell'
import { LayoutBase } from '@components/LayoutBase'
import { PretendLoginButton } from '@components/PretendLoginButton'
import { Typography } from '@mui/material'

export default function LoginPage() {
  return (
    <NoShell>
      <LayoutBase title="Sign In">
        <Typography gutterBottom variant="subtitle1">
          A Sign in page with no shell!
        </Typography>
        <PretendLoginButton />
      </LayoutBase>
    </NoShell>
  )
}
