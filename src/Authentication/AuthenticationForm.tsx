import React, { useState, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SignUp from './SignUp'
import SignIn from './SignIn'


export default function AuthenticationForm(): JSX.Element {
  const [hasAccount, setHasAccount] = useState(true)

  return (
    <Grid container>
      <Grid item lg={4} md={1} sm={0}  />
        <Grid item lg={4} md={12} sm={12} xs={12} padding={3}>
          <Box
            sx={{
            p: 6,
            mt: '15%',
          }}>
            {hasAccount ? 
              <SignIn setHasAccount={setHasAccount}/> 
              : 
              <SignUp setHasAccount={setHasAccount} />
            }
          </Box> 
        </Grid>
        <Grid item lg={4} md={1} sm={0} />
      </Grid>
  )
}

