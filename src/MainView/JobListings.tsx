import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import Job from './Job'
import { BASE_API_ENDPOINT } from '../Helpers/helperMethods'
import './MainView.css'

const PAGES = ['Jobs', 'Profile']

export default function JobListings(): JSX.Element {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get(`${BASE_API_ENDPOINT}/jobs`)
      .then(function (response) {
        setJobs(response.data.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },[])

  return (
    <Box className='container-fluid p-0'>
      <Box className='row'>
        <Box className='col-12 d-none d-md-block'>
          <Navbar pages={PAGES}/>
        </Box>
        <Box className='col-12 d-block d-sm-block d-md-none'/>
        <Box className='col-3 side-bar-view d-none d-md-block'/>
        <Box className='col-sm-12 col-md-9'>
          <Box className='row p-3'>
            {jobs.map((job, index) => (
              <Box className='col-12 col-sm-6 col-md-4 col-lg-3' key={index}>
                <Job job={job} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
