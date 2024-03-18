import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import JobListings from '../MainView/JobListings'
import AuthenticationForm from '../Authentication/AuthenticationForm'
import JobUpload from '../MainView/JobUpload'
import Profile from '../User/Profile'

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
    path: 'jobs/jobUpload',
    element: <JobUpload />,
  },
  {
    path: 'jobs/SignIn',
    element: <AuthenticationForm />
  }
])
