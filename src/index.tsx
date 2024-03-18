import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { RouterProvider } from "react-router-dom"
import { router } from './Route/FlexhireRoutes'

import 'bootstrap/dist/css/bootstrap.css'

const link = createHttpLink({
  uri: 'https://flexhire.com/api/v2',
  credentials: 'omit'
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
  headers: { 
    'FLEXHIRE-API-KEY': '0r3m6yw3g1py6fvc',
  }
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
