import { createContext, useContext } from 'react'

import { NavigationPanelContext } from './types'

export const NavPanelContext = createContext<NavigationPanelContext>({
  checkIsActive: (_href: string) => false,
  framesWithActiveChildren: [],
})

export const ExternalNavigationContext = createContext<{
  parentFrame: string | null
  showHiddenFrame: (_triggerId: string) => void
}>({
  parentFrame: null,
  showHiddenFrame: (_triggerId: string) => undefined,
})

export function useNavigationFrame():
  | { type: 'top' }
  | { type: 'panel'; name: string } {
  const { parentFrame } = useContext(ExternalNavigationContext)

  if (parentFrame === null) {
    return { type: 'top' }
  }

  return { type: 'panel', name: parentFrame as string }
}

export const useTriggerFrame = () => {
  const { showHiddenFrame } = useContext(ExternalNavigationContext)

  return showHiddenFrame
}
