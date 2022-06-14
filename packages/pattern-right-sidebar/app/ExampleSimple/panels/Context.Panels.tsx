import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react'

import { AccountPanelItem, DefaultAccountPanelItems } from './Account.Defaults'
import { AppsPanelItem, DefaultAppsPanelItems } from './Apps.Defaults'
import {
  DefaultNotificationPanelItems,
  NotificationPanelItem,
} from './Notifications.Defaults'

export interface PanelsData {
  account: AccountPanelItem[]
  apps: AppsPanelItem[]
  notifications: NotificationPanelItem[]
}

export interface IPanelsContext {
  data: PanelsData
  updatePanel: <K extends keyof PanelsData>(
    key: K,
    panelData: PanelsData[K],
  ) => void
}

export const PanelContext = createContext<IPanelsContext>(null as any)

export const examplePanelContextValue: PanelsData = {
  account: DefaultAccountPanelItems,
  apps: DefaultAppsPanelItems,
  notifications: DefaultNotificationPanelItems,
}

export function PanelProvider({
  initialValue,
  children,
}: PropsWithChildren<{
  initialValue: PanelsData
}>) {
  const [data, setData] = useState<PanelsData>(initialValue)

  const updatePanel = <K extends keyof PanelsData>(
    key: K,
    panelData: PanelsData[K],
  ) => setData({ ...data, [key]: panelData })

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

export const useExamplePanel = <K extends keyof PanelsData>(panel: K) => {
  const { data, updatePanel } = useContext(PanelContext)
  return {
    data: data[panel],
    updatePanel: (newData: PanelsData[K]) => updatePanel<K>(panel, newData),
  }
}
