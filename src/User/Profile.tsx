import React from 'react'
import { Box } from '@mui/material'
import ProfileTop from './ProfileTop'
import ProfileBottom from './ProfileBottom'

export default function Profile(): JSX.Element {
  return (
    <Box className='container-fluid p-0'>
      <Box className='row'>
        <Box className='col-1' />
        <Box className='col-10' >
          <ProfileTop />
          <ProfileBottom />
        </Box>
        <Box className='col-1'/>
      </Box>
    </Box>
  )
}
