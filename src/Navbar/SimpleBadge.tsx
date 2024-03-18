import React from 'react'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'

export default function SimpleBadge(): JSX.Element {
  return (
    <Badge badgeContent={4} sx={{ color: 'red', cursor: 'pointer' }}>
      <NotificationsNoneIcon sx={{ color: 'white' }} />
    </Badge>
  )
}