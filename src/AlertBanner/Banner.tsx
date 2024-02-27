import { Alert } from '@mui/material'
import * as React from 'react'

interface Prop {
  severity: any
  icon: React.ReactNode
  message: string
}

export default function Banner({ severity, icon, message }: Prop): JSX.Element {
  return (
    <Alert icon={icon} severity={severity}>
      {message}
    </Alert>
  )
}
