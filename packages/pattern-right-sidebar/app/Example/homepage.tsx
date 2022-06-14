import React, { MouseEventHandler } from 'react'

import { Box, Button, Card, Typography } from '@mui/material'

import { usePanel } from '../../lib'
import { usePanelData } from './panels/index.types'
import { NotificationPanelItem } from './panels/notifications.types'

export const Homepage = () => {
  const panels = usePanelData('notifications')
  const { openPanel } = usePanel()

  return (
    <Card>
      <Box px={3} py={6}>
        <Typography variant="h4">Right Sidebar Demo Homepage</Typography>
      </Box>
      <Box px={3} py={6}>
        <Typography variant="h6">Update the Panels with context</Typography>
      </Box>
      <Box px={3} py={6}>
        <Button
          variant="outlined"
          onClick={state.action(panels, openPanel('notifications'))}
        >
          {state.text(panels)}
        </Button>
      </Box>
    </Card>
  )
}

const state = {
  text({ data }: NotificationData) {
    if (data.length >= 5) {
      return 'Remove Notification'
    }

    return 'Add new Notification'
  },
  action(
    { data, updatePanel }: NotificationData,
    openPanel: MouseEventHandler<HTMLElement>,
  ): MouseEventHandler<HTMLElement> {
    return () => {
      if (data.length >= 5) {
        const newData = data.filter(x => x.title !== 'New')
        updatePanel([...newData])
        openPanel(null as any)
        return
      }
      updatePanel([
        {
          body: (
            <>
              <b>Example Notification</b> Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </>
          ),
          title: 'New',
          color: 'primary',
          time: 'Literally right now',
          new: true,
        },
        ...data,
      ])
      openPanel(null as any)
    }
  },
}

type NotificationData = {
  data: NotificationPanelItem[]
  updatePanel: (newData: NotificationPanelItem[]) => void
}
