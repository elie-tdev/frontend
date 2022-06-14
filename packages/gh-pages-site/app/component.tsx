import React from 'react'
import { Providers } from '@components/Providers'
import { AppShellExample } from '@components/AppShell'

export const Entry = (): JSX.Element => {
  return (
    <Providers>
      <AppShellExample />
    </Providers>
  )
}
