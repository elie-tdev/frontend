import React, { ReactNode } from 'react'

export type NotificationPanelItem = {
  title: string
  body: string | NonNullable<ReactNode>
  time: string
  new: boolean
  color:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
}

export const DefaultNotificationPanelItems: NotificationPanelItem[] = Array(
  4,
).fill({
  title: 'Info',
  body: (
    <>
      <b>Jarvis update</b> Lorem ipsum dolor sit amet consectetur adipisicing
      elit.
    </>
  ),
  time: 'A moment ago',
  color: 'secondary',
  new: false,
})
