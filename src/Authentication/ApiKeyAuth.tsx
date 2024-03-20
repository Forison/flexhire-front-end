import React, { useState } from 'react'
import { Button, Box, TextField, Grid } from '@mui/material'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'


export default function ApiKeyAuth(): JSX.Element {
  const [apiKey, setApiKey] = useState('')
  const navigate = useNavigate()
  const cookies = new Cookies()

  const onSubmit = () => {
    cookies.set('access_token', apiKey, {
      path: '/',
      httpOnly: false,
      secure: false
    })
    navigate('/jobs')
  }

  return (
    <Grid container>
      <Grid item lg={4} md={1} sm={0}  />
        <Grid item lg={4} md={12} sm={12} xs={12} padding={3}>
          <Box
            sx={{
            p: 6,
            mt: '15%',
          }}>
            <form onSubmit={onSubmit}>
              <Box sx={{display: 'block'}}>
                <TextField
                  id='apiKey'
                  label='Enter API Key'
                  fullWidth
                  name='apiKey'
                  sx={{
                    marginTop: '2rem'
                  }}
                  onChange={(e)=> setApiKey(e.target.value)}
                />
              </Box>
              <Button
                type='submit'
                variant="contained"
                disableElevation
                fullWidth
                sx={{
                  marginTop: '1.5rem',
                  marginBottom: '0.5rem'
              }}>
                Enter Your Flexhire API Key
              </Button>
            </form>
        </Box> 
      </Grid>
    <Grid item lg={4} md={1} sm={0} />
  </Grid>
  )
}