import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import JobListings from '../MainView/JobListings'
import Profile from '../User/Profile'
import ApiKeyAuth from '../Authentication/ApiKeyAuth'


export const router = createBrowserRouter([
  {   
    path: '/jobs',
    element: <JobListings />,
  },
  {
    path: 'jobs/profile' ,
    element: <Profile />,
  },
  {
    path: '/' , element: <ApiKeyAuth />,
  }
])
