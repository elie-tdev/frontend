import React from 'react'

import NotificationsIcon from '@mui/icons-material/Notifications'
import { Badge, Box, Chip, Divider, Stack, Typography } from '@mui/material'

import { usePanelData } from './index.types'
import { NotificationPanelItem } from './notifications.types'

export const NotificationsPanel = () => {
  const { data } = usePanelData('notifications')
  const new_notifications = data.filter(x => x.new)
  const old_notifications = data.filter(x => !x.new)
  return (
    <Box paddingTop={3}>
      {new_notifications.length !== 0 && (
        <NotificationStack title="New" items={new_notifications} />
      )}
      {old_notifications.length !== 0 && (
        <NotificationStack title="Old" items={old_notifications} />
      )}
    </Box>
  )
}

const NotificationStack = ({
  items,
  title,
}: {
  title: string
  items: NotificationPanelItem[]
}) => {
  return (
    <>
      <Divider textAlign="left">
        <Typography variant="body2" color="secondary">
          {title} ({items.length})
        </Typography>
      </Divider>
      <Stack
        direction="column"
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
        sx={{ marginY: 2 }}
      >
        {items.map((d, i) => (
          <Box key={`notification-panel-item-${title}-${i}`} paddingX={2}>
            <Typography gutterBottom variant="body2">
              {d.body}
            </Typography>
            <Typography
              sx={{ display: 'block', marginTop: 1 }}
              variant="caption"
            >
              <Chip
                sx={{ marginRight: 1 }}
                size="small"
                label={d.title}
                color={d.color}
              />

              {d.time}
            </Typography>
          </Box>
        ))}
      </Stack>
    </>
  )
}

/**
 * Create a dynamic icon that listens to context and update's it's
 * badge according to if there's new notifications or not
 */
export const DynamicNotificationIcon = () => {
  const panels = usePanelData('notifications')
  const new_items = panels.data.filter(x => x.new)
  // if we have new items in notifications
  if (new_items.length > 0) {
    return (
      <Badge badgeContent={new_items.length} color="primary">
        <NotificationsIcon />
      </Badge>
    )
  }
  // if we don't have new items, just show the base icon
  return <NotificationsIcon />
}
