import { useContext, useEffect, useMemo, useState } from 'react'
import { AppShellCtx } from '../context/global'
import { RightPanelItem } from '../types/props'
import type { Breakpoint, BreakpointDevice } from './internal.useBreakpoints'

export const useBreakpoints = (): [
  device: BreakpointDevice,
  name: Breakpoint,
] => {
  const {
    breakpoints: { device, name },
  } = useContext(AppShellCtx)
  const [bpDevice, bpName] = useMemo(() => [device, name], [device, name])
  return [bpDevice, bpName]
}

export const useShellVisibility = (): [
  visible: boolean,
  openShell: () => void,
  closeShell: () => void,
] => {
  const {
    shell: { isOpen, openShell, closeShell },
  } = useContext(AppShellCtx)

  return [isOpen, openShell, closeShell]
}

export const useLeftPanel = (): [
  open: boolean,
  setOpen: (nextState: boolean) => void,
] => {
  const {
    leftPanel: { isOpen, setIsOpen },
  } = useContext(AppShellCtx)
  const [state, setState] = useMemo(
    () => [isOpen, setIsOpen],
    [isOpen, setIsOpen],
  )
  return [state, setState]
}

export function _internal_useRightPanel() {
  const {
    rightPanel: { closePanel, openPanelName, panels, setOpenPanel, isOpen },
  } = useContext(AppShellCtx)
  const [activePanel, setActivePanel] = useState<RightPanelItem | null>(null)

  useEffect(() => {
    if (openPanelName !== null) {
      const panel = panels?.find(p => p.name === openPanelName)
      if (!panel) {
        closePanel()
        setActivePanel(null)
      } else {
        setActivePanel(panel)
      }
    } else {
      closePanel()
    }
  }, [openPanelName])

  return {
    state: {
      panelName: openPanelName,
      activePanel,
      isOpen,
    },
    close: closePanel,
    open: setOpenPanel,
  }
}
