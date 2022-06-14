import { useContext } from 'react'

import { IPanelContext, PanelContext } from '../context/PanelContext'

import type { MouseEventHandler } from 'react'

export function usePanel(): Pick<
  IPanelContext,
  'closeDrawer' | 'drawerIsOpen'
> & {
  openPanel: (id: string) => MouseEventHandler<HTMLElement>
} {
  const { closeDrawer, openPanel, drawerIsOpen } = useContext(PanelContext)

  return {
    closeDrawer,
    openPanel: (id: string) => _e => openPanel(id),
    drawerIsOpen,
  }
}

export const usePanelInternal = (): Omit<IPanelContext, 'openPanel'> & {
  openPanel: (id: string) => MouseEventHandler<HTMLElement>
} => {
  const ctx = useContext(PanelContext)

  return {
    ...ctx,
    openPanel:
      (id: string): MouseEventHandler<HTMLElement> =>
      _e =>
        ctx.openPanel(id),
  }
}
