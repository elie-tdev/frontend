import React from 'react'
import { Providers } from '../Providers'
import { AppShellExample } from '../../examples/with-app-shell'
import { SimpleExample } from '../../examples/simple'

export const Entry = (): JSX.Element => {
  return (
    <Providers>
      <AppShellExample />
      {/* <SimpleExample /> */}
    </Providers>
  )
}
