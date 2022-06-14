import React from 'react'

import AccountIcon from '@mui/icons-material/AccountCircle'
import AppsIcon from '@mui/icons-material/AppsRounded'

import { AccountPanel } from './Account'
import { AppsPanel } from './Apps'
import { DynamicNotificationIcon, NotificationsPanel } from './Notifications'

import type { PanelArr } from '../../../lib'
export const Panels: PanelArr = [
  {
    id: 'account',
    title: 'Account',
    panel: <AccountPanel />,
    icon: <AccountIcon />,
  },
  {
    id: 'apps',
    title: 'Apps',
    panel: <AppsPanel />,
    icon: <AppsIcon />,
  },
  {
    id: 'notifications',
    title: 'Notifications',
    panel: <NotificationsPanel />,
    icon: <DynamicNotificationIcon />,
  },
]
