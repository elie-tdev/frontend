import React from 'react'

import Providers from '../components/Providers'
import Routes from '../components/Router'

export const App = (): JSX.Element => {
  return (
    <>
      <Providers>
        <Routes />
      </Providers>
    </>
  )
}
