import React from 'react'
import { Alert } from '@mui/material'

interface Prop {
  isSuccess?: boolean
  status: string
}

export default function Notice({ status, isSuccess = true}: Prop): JSX.Element {

  if (isSuccess) {
    return <Alert severity="success">{status}</Alert>
  }
  return <Alert severity="error">{status}</Alert>
}
