import React from 'react'
import Badge from '@mui/material/Badge'
import MailIcon from '@mui/icons-material/Mail'

export default function SimpleBadge(): JSX.Element {
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  )
}