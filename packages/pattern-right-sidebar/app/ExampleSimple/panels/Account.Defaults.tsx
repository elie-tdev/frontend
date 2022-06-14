import React, { ReactNode } from 'react'

export type AccountPanelItem = {
  title: string | NonNullable<ReactNode>
}

export const DefaultAccountPanelItems = [
  { title: 'Profile' },
  { title: 'Preferences' },
  { title: 'Messages' },
  {
    title: (
      <>
        <b>Logout</b>
      </>
    ),
  },
]
