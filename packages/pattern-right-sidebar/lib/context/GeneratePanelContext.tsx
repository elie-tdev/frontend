import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'

type PanelContextData<T extends { [key: string]: unknown }> = {
  data: T
  updatePanel: <K extends keyof T>(key: K, panelData: T[K]) => void
}

export function makePanelData<T extends { [key: string]: unknown }>(
  initial_data: T,
): {
  PanelProvider: FC<PropsWithChildren<{}>>
  usePanelData: <K extends keyof T>(
    panel: K,
  ) => {
    data: T[K]
    updatePanel: (newData: T[K]) => void
  }
} {
  const PanelContext = createContext<PanelContextData<T>>(null as any)

  const PanelProvider = ({
    initialValue = initial_data,
    children,
  }: PropsWithChildren<{
    initialValue?: T
  }>) => {
    const [data, setData] = useState<T>(initialValue)

    const updatePanel = <K extends keyof T>(key: K, panelData: T[K]) =>
      setData({ ...data, [key]: panelData })

    return (
      <PanelContext.Provider
        value={{
          data,
          updatePanel,
        }}
      >
        {children}
      </PanelContext.Provider>
    )
  }

  const usePanelData = <K extends keyof T>(panel: K) => {
    const { data, updatePanel } = useContext(PanelContext)
    return {
      data: data[panel],
      updatePanel: (newData: T[K]) => updatePanel<K>(panel, newData),
    }
  }

  return {
    PanelProvider,
    usePanelData,
  }
}
