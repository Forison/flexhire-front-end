import * as React from 'react'
import Box from '@mui/material/Box'
import JobDetail from './JobDetail'
interface Prop  {
  job: any
}

export default function Job({ job }: Prop): JSX.Element {
  const { name, description, location, poster_url, id, creation_date } = job.attributes
  return (
    <Box sx={{ mt: '3.rem', mb: '3rem'}} key={job.id}>
      <JobDetail 
        name={name}
        location={location}
        description={description}
        poster_url={poster_url}
        jobId={id}
        creation_date={creation_date}
      />
    </Box>
  )
}
