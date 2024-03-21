import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Box, Button, Grid, TextField, Typography } from '@mui/material'
import { jobSchema } from '../Helpers/schema'
import Loading from '../Loading/Loading'
import {
  POSITIVE_FEEDBACK,
} from '../Helpers/helperMethods'
import Notice from '../AlertBanner/Notice'


const defaultValues = {
  name: '',
  location: '',
  description: '',
  poster: [{}],
  logo: [{}],
}

export default function JobUpload(): JSX.Element {
  const [status, setStatus] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(jobSchema)
  })
  
  const onSubmit = (data) => {
    setIsLoading(true)
    const formData = new FormData()
    data.poster = (document.getElementById('poster') as HTMLInputElement)?.files
    data.poster = data.poster[0]
    
    formData.append('name', data.name)
    formData.append('location', data.location)
    formData.append('description', data.description)
    formData.append('poster', data.poster)

    const cookies = new Cookies()
    axios.defaults.headers.common['Authorization'] = `${cookies.get('access_token')}`
    axios.post(`${process.env.REACT_APP_REST_API_ENDPOINT}/jobs`, formData)
      .then(function (response) {
        const { data: { status: { message, code  }} } = response
        if(code === POSITIVE_FEEDBACK){
          setIsSuccess(true)
          setStatus(message)
          setTimeout(() => {
            navigate('/jobs')
          }, 2000)
        }else {
          setIsSuccess(false)
        }
        setIsLoading(false)
      })
      .catch(function (error) {
        setStatus(error.message)
        setIsLoading(false)
    })
  }
  
  if(isLoading) return <Loading />

  return (
    <Grid container>
      <Grid item lg={4} md={1} sm={0} />
        <Grid item lg={4} md={12} padding={3}>
          <Box
            sx={{
            p: 6,
            mt: '15%',
          }}>
            <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
              {status && <Notice status={status} isSuccess={isSuccess} />}
              <Box sx={{display: 'block'}}>
                <TextField
                  fullWidth
                  id='name'
                  label='Company name'
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
                  id='location'
                  label='Location'
                  type='text'
                  name='location'
                  sx={{
                    marginTop: '2rem'
                  }}
                  inputProps={register('location')}
                />
                <Typography color='red'>{errors.location?.message}</Typography>
                <Typography sx={{ marginTop: '2rem' }}>Poster</Typography>
                <TextField
                  fullWidth
                  id='poster'
                  placeholder='Poster'
                  name='poster'
                  type='file'
                  inputProps={register('poster')}
                  />
  
                <TextField
                  fullWidth
                  id='description'
                  label='Description'
                  name='description'
                  multiline
                  rows={4}
                  inputProps={register('description')}
                  sx={{
                    marginTop: '2rem'
                  }}
                />
                <Typography color='red'>{errors.description?.message}</Typography>

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
                  UPLOAD JOB
                </Button>
              </Box>
            </form>
          </Box> 
        </Grid>
      <Grid item lg={4} md={1} sm={0} />
    </Grid>
  )
}
