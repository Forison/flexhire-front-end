import React, { useState, Dispatch, SetStateAction } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import SignUp from './SignUp'
import SignIn from './SignIn'

interface Prop {
  setShowSignInPage: Dispatch<SetStateAction<boolean>>
}

export default function AuthenticationForm(): JSX.Element {
  const [showSignInPage, setShowSignInPage] = useState(false)

  return (
    <Grid container>
      <Grid item lg={4} md={1} sm={0}  />
        <Grid item lg={4} md={12} sm={12} xs={12} padding={3}>
          <Box
            sx={{
            p: 6,
            mt: '15%',
          }}>
            {showSignInPage ? 
              <SignIn setShowSignInPage={setShowSignInPage}/> 
              : 
              <SignUp setShowSignInPage={setShowSignInPage} />
            }
          </Box> 
        </Grid>
        <Grid item lg={4} md={1} sm={0} />
      </Grid>
  )
}

