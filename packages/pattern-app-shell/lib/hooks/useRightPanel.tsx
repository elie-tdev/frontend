import { _internal_useRightPanel } from './internal.misc'

export function useRightPanel() {
  const { close, open, state } = _internal_useRightPanel()

  return {
    handleClose: close,
    handleOpen: (panelName: string) => () => open(panelName),
    isOpen: state.isOpen,
    currentPanel: state.panelName,
  }
}
