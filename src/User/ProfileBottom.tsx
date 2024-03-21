import React, { useEffect, useState } from 'react'
import {
  Grid,
  Box,
  Typography,
  Tab,
  Tabs,
  CardMedia,
} from '@mui/material'
import axios from 'axios'
import { BASE_API_ENDPOINT } from '../Helpers/helperMethods'
import Job from '../MainView/Job'
import Loading from '../Loading/Loading'


interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}


export default function ProfileBottom(): JSX.Element {
  const [value, setValue] = useState(0)
  const [userJobs, setUserJobs] = useState([])
  const [userFavoriteJobs, setUserFavoriteJobs] = useState([])
  const [isloading, setIsloading] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
  }

  useEffect(() => {
    setIsloading(true)
    axios.get(`${BASE_API_ENDPOINT}/user_jobs`)
      .then(function (response) {
        setUserJobs(response.data.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    setIsloading(false)
  },[])

  useEffect(() => {
    setIsloading(true)
    axios.get(`${BASE_API_ENDPOINT}/user_favorite_job`)
      .then(function (response) {
        setUserFavoriteJobs(response.data.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
    setIsloading(false)
  },[])
  
  if(isloading) return <Loading />

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='My jobs'/>
          <Tab label='My favorite jobs' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box className='row p-3'>
          {userJobs.map((job, index) => (
            <Box className='col-12 col-sm-6 col-md-4' key={index}>
              <Job job={job} enableLike= {false} />
            </Box>
          ))}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box className='row p-3'>
          {userFavoriteJobs.map((job, index) => (
            <Box className='col-12 col-sm-6 col-md-4' key={index}>
              <Job job={job} enableLike={false} />
            </Box>
          ))}
        </Box>
      </TabPanel>
    </Box>
  )
}