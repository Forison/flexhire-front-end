import React from 'react'
import Grid from '@mui/material/Grid'
import Navbar from '../Navbar/Navbar'
import SideBarAccordion from '../SideBar/SideBarAccordion'
import './App.css'
import Job from '../MainView/Job'

const PAGES = ['Jobs', 'Dashboard', 'About']
const EXTRA_PAGES = PAGES.concat('Opportunity','Applied', 'Screening', 'Interviews','Offers', 'Profile', 'Settings', 'Tutorials')

export default function App(): JSX.Element {

  const Dummy =[{
    name: 'string',
    location: 'string',
    description: 'string',
    logo: 'string'
  }]

  return (
    <Grid container>
      <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'none', md: 'block' }}}>
        <Navbar pages={PAGES} />
      </Grid>
      <Grid item xs={12} sx={{ display: { xs: 'block', sm: 'block', md: 'none' }}}>
        <Navbar pages={EXTRA_PAGES} />
      </Grid>
      <Grid item xs={2} sx={{ display: { xs: 'none', sm: 'none', md: 'block' }}}>
        <SideBarAccordion />
      </Grid>
      <Grid container xs={10} rowSpacing={3} columnSpacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Job job={Dummy} />
        </Grid>
      </Grid>
    </Grid>
  )
}
