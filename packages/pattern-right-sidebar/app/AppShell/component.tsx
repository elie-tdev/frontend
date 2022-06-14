import React from 'react'

/**
 * Normal Example (Comment out to view simple example)
 */
import { RightSidePanelProvider, RightSidePanelTriggers } from '../Example'
/**
 * Simple Example (Uncomment to view)
 */
// import {
//   RightSidePanelProvider,
//   RightSidePanelTriggers
// } from '../ExampleSimple'
/*
===========================================================
*/
import { Homepage } from '../Example/homepage'
import { ThemeToggleButton } from '../Theme/ThemeButton'
import { Wrapper } from '../Wrapper'

export const RightSidePanelExample = () => {
  return (
    <RightSidePanelProvider>
      <Wrapper
        title="Right Sidebar"
        topbar={
          <>
            <ThemeToggleButton sx={{ marginLeft: 'auto', marginRight: 2 }} />
            <RightSidePanelTriggers />
          </>
        }
      >
        <Homepage />
      </Wrapper>
    </RightSidePanelProvider>
  )
}
