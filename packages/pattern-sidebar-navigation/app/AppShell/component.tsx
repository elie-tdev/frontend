import React from 'react'

import { SidebarExample } from '../Example'
import { ThemeToggleButton } from '../Theme'
import { Wrapper } from '../Wrapper'
import { AllRoutes } from './components/Routes'

export const AppShellExample = () => {
  return (
    <Wrapper
      title="Dynamic Navigation"
      sidebar={<SidebarExample />}
      topbar={<ThemeToggleButton sx={{ marginLeft: 'auto' }} />}
    >
      <AllRoutes />
    </Wrapper>
  )
}
