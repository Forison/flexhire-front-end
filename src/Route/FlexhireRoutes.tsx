import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import JobListings from '../MainView/JobListings'
import Profile from '../User/Profile'

export const router = createBrowserRouter([
  {   
    path: '/jobs',
    element: <JobListings />,
  },
  {
    path: 'jobs/profile' ,
    element: <Profile />,
  }
])
