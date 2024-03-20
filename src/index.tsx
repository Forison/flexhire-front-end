import React from 'react'
import ReactDOM from 'react-dom/client'
import Cookies from 'universal-cookie'
import { 
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { RouterProvider } from "react-router-dom"
import { router } from './Route/FlexhireRoutes'

import 'bootstrap/dist/css/bootstrap.css'


const cookies = new Cookies()

const externalApiKey = cookies.get('access_token')
const apiKey = `${process.env.REACT_APP_FLEXHIRE_API_KEY}`
const apiEndpoint = `${process.env.REACT_APP_FLEXHIRE_API_ENDPOINT}`

const link = createHttpLink({
  uri: apiEndpoint,
  credentials: 'omit',
  headers: { 
    'FLEXHIRE-API-KEY': apiKey || externalApiKey,
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ApolloProvider>
)
