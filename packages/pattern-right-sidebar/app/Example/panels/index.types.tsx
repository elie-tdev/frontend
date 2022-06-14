import { makePanelData } from '../../../lib'
import { DefaultAccountPanelItems } from './account.types'
import { DefaultAppsPanelItems } from './apps.types'
import { DefaultNotificationPanelItems } from './notifications.types'

const { PanelProvider, usePanelData } = makePanelData({
  account: DefaultAccountPanelItems,
  apps: DefaultAppsPanelItems,
  notifications: DefaultNotificationPanelItems,
})

export { PanelProvider, usePanelData }
