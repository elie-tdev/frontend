import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  Reducer,
  useCallback,
} from 'react'
import { useBreakpoints } from '../hooks/internal.useBreakpoints'
import type { AppShellComponentProps } from '../types/props'
import type { PropsWithChildren } from 'react'
import type {
  Breakpoint,
  BreakpointDevice,
} from '../hooks/internal.useBreakpoints'

export interface IAppShellCtx {
  leftPanel: {
    isOpen: boolean
    setIsOpen: (nextState: boolean) => void
  }
  rightPanel: {
    panels: AppShellComponentProps['rightPanels']
    openPanelName: string | null
    isOpen: boolean
    setOpenPanel: (panelName: string) => void
    closePanel: () => void
  }
  breakpoints: {
    name: Breakpoint
    device: BreakpointDevice
  }
  shell: {
    isOpen: boolean
    openShell: () => void
    closeShell: () => void
  }
  currentUrl: string
}

const AppShellCtx = createContext<IAppShellCtx>({
  leftPanel: {
    isOpen: false,
    setIsOpen: (_nextState: boolean) => void 0,
  },
  rightPanel: {
    panels: [],
    openPanelName: null,
    isOpen: false,
    setOpenPanel: (_panelName: string) => void 0,
    closePanel: () => void 0,
  },
  breakpoints: {
    name: 'xs',
    device: 'mobile',
  },
  shell: {
    isOpen: true,
    openShell: () => void 0,
    closeShell: () => void 0,
  },
  currentUrl: '',
})

AppShellCtx.displayName = 'BAIAppShellContext'

type AppShellReducerState = {
  leftPanelOpen: boolean
  shellOpen: boolean
  rightPanel: {
    panelName: null | string
    isOpen: boolean
  }
}

type AppShellReducerAction =
  | { type: 'openLeftPanel' }
  | { type: 'closeLeftPanel' }
  | { type: 'openShell' }
  | { type: 'closeShell' }
  | { type: 'setRightPanel'; name: string }
  | { type: 'setRightPanelAndOpen'; name: string }
  | { type: 'closeRightPanel' }
  | { type: 'closeLeftAndRightPanels' }

const reducer: Reducer<AppShellReducerState, AppShellReducerAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'openLeftPanel':
      return { ...state, leftPanelOpen: true }
    case 'closeLeftPanel':
      return { ...state, leftPanelOpen: false }
    case 'openShell':
      return { ...state, shellOpen: true }
    case 'closeShell':
      return { ...state, shellOpen: false }
    case 'setRightPanel':
      return {
        ...state,
        rightPanel: { ...state.rightPanel, panelName: action.name },
      }
    case 'setRightPanelAndOpen':
      return {
        ...state,
        rightPanel: {
          ...state.rightPanel,
          isOpen: true,
          panelName: action.name,
        },
      }
    case 'closeRightPanel':
      return { ...state, rightPanel: { ...state.rightPanel, isOpen: false } }
    case 'closeLeftAndRightPanels':
      return {
        ...state,
        leftPanelOpen: false,
        rightPanel: { ...state.rightPanel, isOpen: false },
      }
  }
}

const AppShellProviderInternal = ({
  children,
  currentUrl,
  rightPanels,
}: PropsWithChildren<{
  currentUrl: string
  rightPanels: AppShellComponentProps['rightPanels']
}>) => {
  const [breakpointName, breakpointDevice] = useBreakpoints()
  const [state, dispatch] = useReducer(reducer, {
    leftPanelOpen: false,
    shellOpen: true,
    rightPanel: {
      panelName: null,
      isOpen: false,
    },
  })

  // All the names of the right panels
  const rightPanelNames = useMemo(
    () => rightPanels?.map(pnl => pnl.name),
    [rightPanels],
  )

  // Close the right and left panels when the url changes
  useEffect(() => {
    dispatch({ type: 'closeLeftAndRightPanels' })
  }, [currentUrl])

  // Close panel that no longer exists for right panel
  useEffect(() => {
    if (state.rightPanel.panelName) {
      const rightPanelExists =
        rightPanelNames?.includes(state.rightPanel.panelName) ?? false
      if (!rightPanelExists) {
        dispatch({ type: 'closeRightPanel' })
      }
    }
  }, [rightPanelNames])

  // Make sure we automatically close the navigation when the screen size
  // is not mobile or tablet
  useEffect(() => {
    if (breakpointDevice === 'desktop' && state.leftPanelOpen === true) {
      dispatch({ type: 'closeLeftPanel' })
    }
  }, [breakpointDevice])

  // Allows the ability to open the right panel
  const setOpenPanelRight = useCallback(
    (panelName: string) => {
      // only open valid panels
      if (rightPanelNames?.includes(panelName) ?? false) {
        dispatch({ type: 'setRightPanelAndOpen', name: panelName })
      } else {
        // TODO: If in development, warn that the panel being opened is not passed in as a prop to app shell.
      }
    },
    [rightPanelNames],
  )

  // Allows the ability to close the right panel
  const closePanelRight = useCallback(
    () => dispatch({ type: 'closeRightPanel' }),
    [],
  )

  const setLeftPanel = useCallback(
    (nextState: boolean) =>
      nextState
        ? dispatch({ type: 'openLeftPanel' })
        : dispatch({ type: 'closeLeftPanel' }),
    [],
  )

  const closeShell = useCallback(() => dispatch({ type: 'closeShell' }), [])
  const openShell = useCallback(() => dispatch({ type: 'openShell' }), [])

  return (
    <AppShellCtx.Provider
      value={{
        leftPanel: {
          isOpen: state.leftPanelOpen,
          setIsOpen: setLeftPanel,
        },
        rightPanel: {
          panels: rightPanels,
          openPanelName: state.rightPanel.panelName,
          isOpen: state.rightPanel.isOpen,
          setOpenPanel: setOpenPanelRight,
          closePanel: closePanelRight,
        },
        breakpoints: {
          name: breakpointName,
          device: breakpointDevice,
        },
        shell: {
          isOpen: state.shellOpen,
          openShell,
          closeShell,
        },
        currentUrl,
      }}
    >
      {children}
    </AppShellCtx.Provider>
  )
}

export { AppShellCtx, AppShellProviderInternal }
