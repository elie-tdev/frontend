/**
 * Context to hold panel data
 */
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { PanelWrapper } from '../components/PanelWrapper'

import type { PanelArr, PanelBase, PanelProps, PanelSettings } from '../types'

const wrapPanel = (panelData: PanelBase): PanelBase => ({
  ...panelData,
  panel: <PanelWrapper panelData={panelData} />,
})

interface IPanelContext {
  panels: PanelArr
  focusedPanel: string | null
  drawerIsOpen: boolean
  closeDrawer: () => void
  openPanel: (id: string) => void
  panelSettings: PanelSettings
}

const PanelContext = createContext<IPanelContext>(null as any)
PanelContext.displayName = 'RightPanelContext'

function PanelProvider({
  panels: panelValue,
  config: panelSettings,
  children,
}: PanelProps) {
  const [panels, setPanels] = useState<PanelArr>(panelValue.map(wrapPanel))
  const [focusedPanel, setFocusedPanel] = useState<string | null>(null)

  useEffect(() => {
    setPanels(panelValue.map(wrapPanel))
  }, [panelValue])

  /**
   * A bool that lets us know if the drawer should be open or not
   */
  const drawerIsOpen: boolean = useMemo(
    () => focusedPanel !== null,
    [focusedPanel],
  )

  /**
   * Close the drawer by setting the focused panel to null
   */
  const closeDrawer: () => void = useCallback(
    () => setFocusedPanel(null),
    [setFocusedPanel],
  )

  /**
   * Open the drawer (if closed) and focus the panel with the passed `id`
   */
  const openPanel: (id: string) => void = useCallback(
    (id?: string) => {
      const panelIdx = panels.findIndex(p => p.id === id)
      if (panelIdx === -1) {
        console.error(
          `[RightPanel | openPanel]: The Right Panel doesn't include a panel with a key of ${id}.`,
        )
        return
      }

      setFocusedPanel(id ?? Object.keys(panels)[0])
    },
    [setFocusedPanel, panels],
  )

  return (
    <PanelContext.Provider
      value={{
        drawerIsOpen,
        closeDrawer,
        openPanel,
        panels,
        focusedPanel,
        panelSettings,
      }}
    >
      {children}
    </PanelContext.Provider>
  )
}

export { PanelContext, PanelProvider }

export type { IPanelContext }
