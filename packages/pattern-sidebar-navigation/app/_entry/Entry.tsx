import React from 'react'

import { AppShellExample } from '../AppShell'
import { Providers } from '../Providers'

export const Entry = (): JSX.Element => {
  return (
    <>
      <Providers>
        <AppShellExample />
      </Providers>
    </>
  )
}
