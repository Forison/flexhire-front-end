import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, TextField, Link, Typography } from '@mui/material'
import { signUpSchema } from '../Helpers/schema'
import Loading from '../Loading/Loading'
import { 
  BASE_API_ENDPOINT,
  POSITIVE_FEEDBACK,
  storeToken,
} from '../Helpers/helperMethods'
import Notice from '../AlertBanner/Notice'

const defaultValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}
interface Prop {
  setHasAccount: Dispatch<SetStateAction<boolean>>
}

export default function SignIn({ setHasAccount }: Prop): JSX.Element {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIssuccess] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(signUpSchema)
  })

  const onSubmit = (data) => {
    console.log(data)
    setIsLoading(true)
    const { name, email, password } = data
    axios.post(`${BASE_API_ENDPOINT}/signup`, {
      user: { name, email, password }
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

  if(isLoading) return (<Box><Loading /></Box>)

  return (
  <form onSubmit={handleSubmit(onSubmit)}>
    {status && <Notice status={status} isSuccess={isSuccess} />}
    <Box sx={{display: 'block'}}>
      <TextField
        fullWidth
        id='name'
        label='name'
        type='text'
        name='name'
        sx={{
          marginTop: '2rem'
        }}
        inputProps={register('name')}
      />
      <Typography color='red'>{errors.name?.message}</Typography>
      <TextField
        fullWidth
        id='email'
        label='email'
        type='text'
        name='email'
        sx={{
          marginTop: '2rem'
        }}
        inputProps={register('email')}
      />
      <Typography color='red'>{errors.email?.message}</Typography>
      <TextField
        fullWidth
        id='password'
        label='password'
        type='text'
        name='password'
        sx={{
          marginTop: '2rem'
        }}
        inputProps={register('password')}
      />
      <Typography color='red'>{errors.password?.message}</Typography>
      <TextField
        fullWidth
        id='passwordConfirmation'
        label='password Confirmation'
        type='text'
        name='passwordConfirmation'
        sx={{
          marginTop: '2rem'
        }}
        inputProps={register('passwordConfirmation')}
      />
      <Typography color='red'>{errors.passwordConfirmation?.message && 'Password mismatch'}</Typography>

      <Button
        type='submit'
        variant='contained'
        disableElevation
        fullWidth
        sx={{
          marginTop: '1.5rem',
          marginBottom: '.5rem'
        }}
      >
        Sign Up
      </Button>
      <Typography align='center'>
        <Link 
          onClick={() => setHasAccount(true)}
          variant='body2' 
          underline='hover'
        >
            Already a member ? Sign in.
        </Link>
      </Typography>
    </Box>
    </form>
  )
}
