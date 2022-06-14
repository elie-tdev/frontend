import React from 'react'

import { SimpleExample } from '../../examples/Simple/index'
import { Providers } from '../Providers'

export const Entry = (): JSX.Element => {
  return (
    <>
      <Providers>
        <SimpleExample />
      </Providers>
    </>
  )
}
