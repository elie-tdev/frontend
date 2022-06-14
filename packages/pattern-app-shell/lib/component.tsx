import React from 'react'
import { AppShellProviderInternal } from './context/global'
import { Visibility } from './components/Visibility'
import type { PropsWithChildren } from 'react'
import type { AppShellProps } from './types/props'

export function AppShell({
  children,
  ...props
}: PropsWithChildren<AppShellProps>) {
  return (
    <AppShellProviderInternal
      rightPanels={props.components?.rightPanels}
      currentUrl={props.currentUrl}
    >
      <Visibility {...props}>{children}</Visibility>
    </AppShellProviderInternal>
  )
}
