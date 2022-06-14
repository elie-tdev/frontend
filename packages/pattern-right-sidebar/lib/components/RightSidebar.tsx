import React from 'react'

import { PanelProvider } from '../context'
import { PanelProps } from '../types'
import { RightSidebarDrawer } from './RightSidebarDrawer'

/**
 * ----
 * This Package - exports: {Provider, Hook, RightSidebar}
 * ----
 * Providers
 *    AppShell
 *      Left Sidebar
 *      Right Sidebar
 *      Header - {may include triggers / buttons from Left & Right Sidebars, etc}
 * ----
 */
export function RightSidebar({ config, panels, children }: PanelProps) {
  return (
    <PanelProvider config={config} panels={panels}>
      <>
        {children}
        <RightSidebarDrawer />
      </>
    </PanelProvider>
  )
}
