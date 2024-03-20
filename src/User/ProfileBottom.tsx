import * as React from 'react'
import { Grid, Box, Typography, Tab, Tabs, CardMedia } from '@mui/material'
import { useQuery, gql } from '@apollo/client'
import Loading from '../Loading/Loading'
import Notice from '../AlertBanner/Notice'

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

const USER_PROFILE_QUERY = gql`
  {
    user(id: "dXNlcnMtMzAwOQ==") {
      name
      email
      avatarUrl
      answers {
        url
      }
      video{
        url
      }
    }
  }
`

export default function ProfileBottom(): JSX.Element {
  const [value, setValue] = React.useState(0)
  const { data, error, loading } = useQuery(USER_PROFILE_QUERY)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event.preventDefault()
    setValue(newValue)
  }
  if(loading) return <Loading />
  if (error) return <Notice status={error.message} isSuccess={false} />
  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange}>
          <Tab label='Introductory Video'/>
          <Tab label='Answers' />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <CardMedia
        component='video'
        image={data?.video?.url}
        title='Introductory video'
        controls
        autoPlay
      />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container component={'div'}>
          {data?.user?.answers.map((answer, index) => {
            return (
              <Grid item lg={6} xs={12} key={index}>
                <CardMedia
                  component='video'
                  image={answer.url}
                  title='answer'
                  controls
                  sx={{ padding: '.5rem'}}
                />
              </Grid>
          )})}
        </Grid>
      </TabPanel>
    </Box>
  )
}