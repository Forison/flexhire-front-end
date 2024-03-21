import React from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Box } from '@mui/material'
import ProfileTop from './ProfileTop'
import ProfileBottom from './ProfileBottom'

export default function Profile(): JSX.Element {
  const cookies = new Cookies()
  axios.defaults.headers.common['Authorization'] = `${cookies.get('access_token')}`
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
