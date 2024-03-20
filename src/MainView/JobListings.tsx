import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { Box } from '@mui/material'
import Navbar from '../Navbar/Navbar'
import Loading from '../Loading/Loading'
import Notice from '../AlertBanner/Notice'
import JobDetail from './JobDetail'
import './MainView.css'

const PAGES = ['Jobs', 'Profile']

const JOB_OPPORTUNITIES_QUERY = gql`
query JobOpportunities{
  user(rawId: 3009){
    jobOpportunities(first: 5){
      edges{
        node{
          title
          description
          positionTypes
          firm{
            name
          }
          freelancerRate{
            formatted(nullifyIfZero: true)
            currency{
              symbol
            }
          }
          minFreelancerRate{
            formatted(nullifyIfZero: true)
            currency{
              symbol
            }
          }
          jobSkills{
            requiredYears
            skill{
              name
            }
          }
          
        }
      }
    }
  }
}
`

export default function JobListings(): JSX.Element {
  const { data, error, loading } = useQuery(JOB_OPPORTUNITIES_QUERY)

  if(loading) return <Loading />
  if(error) return <Notice isSuccess={false} status={error.message}/>

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
            {data?.user?.jobOpportunities.edges.map((job, index) => (
              <Box className='col-12' key={index}>
                <JobDetail job={job.node} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
