import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'
import JobListings from '../MainView/JobListings'
import AuthenticationForm from '../Authentication/AuthenticationForm'
import JobUpload from '../MainView/JobUpload'

export const router = createBrowserRouter([
    {   
      path: '/' ,
      element: <JobListings />,
    },
    {
      path: '/login',
      element: <AuthenticationForm />,
    },
    {
      path: 'jobUpload',
      element: <JobUpload />,
    },
    {
      path: 'SignIn',
      element: <AuthenticationForm />
    }
])
