import React, { SetStateAction, Dispatch, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Link, Typography } from '@mui/material'
import { signInSchema } from '../Helpers/schema'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  POSITIVE_FEEDBACK,
  storeToken,
} from '../Helpers/helperMethods'
import axios from 'axios'
import Loading from '../Loading/Loading'
import Notice from '../AlertBanner/Notice'

interface Prop {
  setHasAccount: Dispatch<SetStateAction<boolean>>
}

const defaultValues = {
  email: '',
  password: '',
}

export default function SignIn({ setHasAccount }: Prop): JSX.Element {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIssuccess] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(signInSchema)
  })
  
  const onSubmit = (data) => {
    setIsLoading(true)
    const { email, password } = data
 
    axios.post(`${process.env.REACT_APP_REST_API_ENDPOINT}/login`, {
      user: { email, password }
    })
    .then(function (response) {
      const { data: { status: { code, message } }, headers } = response
      setTimeout(() => {
        setStatus(message)
      }, 1000)

      if(code === POSITIVE_FEEDBACK){
        storeToken(headers.authorization)
        setIssuccess(true)
        setTimeout(() => {
          navigate('/Jobs')
        }, 2000)
        
      }else {
        setIssuccess(false)
      }
      setIsLoading(false)
    })
    .catch(function (error) {
      setStatus(error)
      setIsLoading(false)
    })
  }


  if(isLoading) return <Loading />
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {status && <Notice status={status} isSuccess={isSuccess} />}
      <Box sx={{display: 'block'}}>
        <TextField
          id='email'
          label='Email'
          fullWidth
          name='email'
          sx={{
            marginTop: '2rem'
          }}
          inputProps={register('email')}
        />
        <Typography color='red'>{errors.email?.message}</Typography>
        <TextField
          id='password'
          label='Password'
          fullWidth
          name='password'
          sx={{
            marginTop: '2rem'
          }}
          inputProps={register('password')}
        />
        <Typography color='red'>{errors.password?.message}</Typography>
      <Button
        type='submit'
        variant="contained"
        disableElevation
        fullWidth
        sx={{
          marginTop: '1.5rem',
          marginBottom: '0.5rem'
      }}>
        Sign In
      </Button>
      <Typography align='center'>
        <Link
          onClick={() => setHasAccount(false)}
          variant="body2" 
          underline="hover"
          sx={{display: 'inline-flex'}}
        >
        <ArrowBackIosIcon sx={{ color: 'primary'}}  />
        Don't have an account? create account
        </Link>
      </Typography>
    </Box>
    </form>
  )
}
