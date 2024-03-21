import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card'
import { Avatar, Box } from '@mui/material'
import { BASE_API_ENDPOINT } from '../Helpers/helperMethods'

export default function ProfileTop(): JSX.Element {
  const [avatar, setAvatar] = useState()
  useEffect(() => {
    
    axios.get(`${BASE_API_ENDPOINT}/get_profile_picture`)
      .then(function (response) {
        setAvatar(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },[])

  return (
    <Card>
      <Box>
        <Box sx={{ height: '500px', backgroundColor: 'info.main'}}>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ 
              width: 150,
              height: 150,
              left: '43%',
              top: 380,
              position: 'absolute',
          }}/>
        </Box>
      </Box>
    </Card>
  )
}
