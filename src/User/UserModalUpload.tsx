import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useForm } from 'react-hook-form'
import { Box, Modal, Button, IconButton, Avatar } from '@mui/material'
import { TextField } from '@mui/material'
import { POSITIVE_FEEDBACK } from '../Helpers/helperMethods'
import Notice from '../AlertBanner/Notice'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '.3rem'
}

const defaultValue = {
  image: [{}],
}

export default function UserModalUpload(): JSX.Element {
  const [status, setStatus] = useState('')
  const [avatar, setAvatar] = useState('/static/images/avatar/2.jpg')
  const { register, handleSubmit } = useForm({
    defaultValues: defaultValue
  })
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  const onSubmit = (data) => {
    const formData = new FormData()
    data.avatar = (document.getElementById('image') as HTMLInputElement)?.files
    formData.append('image', data.avatar[0])

    axios.patch(`${process.env.REACT_APP_REST_API_ENDPOINT}/create_profile_picture`, formData)
      .then(function (response) {
        const { data: { status: { code, message  }} } = response
        if(code === POSITIVE_FEEDBACK){
          setStatus(message)
        }
      })
      .catch(function (error) {
      })
      .finally(function () {
        setTimeout(() => {
          setStatus('')
          window.location.reload()
        }, 2000);
      })
  }

  useEffect(() => {
    const cookies = new Cookies()
    axios.defaults.headers.common['Authorization'] = `${cookies.get('access_token')}`
    axios.get(`${process.env.REACT_APP_REST_API_ENDPOINT}/get_profile_picture`)
      .then(function (response) {
        setAvatar(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },[])

  return (
    <>
      <IconButton onClick={()=> setOpen(!open)} sx={{ p: 0 }}>
        <Avatar alt='Remy Sharp' src={avatar} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <form encType='multipart/form-data' onSubmit={handleSubmit(onSubmit)}>
          {status && <Notice status={status} />}
          <Box sx={style}>
            <TextField
              fullWidth
              type='file'
              id='image'
              inputProps={register('image')}
            />
          
          <Button
            type='submit'
            variant='contained'
            disableElevation
            fullWidth
            sx={{
              marginTop: '1.5rem',
              marginBottom: '.5rem'
            }}>
              UPLOAD PROFILE PICTURE
            </Button>
          </Box>
        </form>
      </Modal>
    </>
  )
}