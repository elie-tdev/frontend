import React from 'react'
import { HashRouter as Router } from 'react-router-dom'

import { RightSidePanelExample } from '../AppShell'
import { ThemeProvider } from '../Theme'

export const Entry = (): JSX.Element => {
  return (
    <ThemeProvider>
      <Router>
        <RightSidePanelExample />
      </Router>
    </ThemeProvider>
  )
}
