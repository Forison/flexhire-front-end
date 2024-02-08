import * as React from 'react'
import Box from '@mui/material/Box'
import JobDetail from './JobDetail'
import { Company } from '../Interface/Company'
// import { Paper } from '@mui/material'


interface Prop  {
  job: Company[]
}

export default function Job({ job }: Prop): JSX.Element {

  return (
	  <>
      {job.map((jobInfo, index) => (	
        <Box key={index}>
        {/* <Paper elevation={index > 24 ? index - 1 : index}> */}
          <JobDetail 
            name={jobInfo.name}
            location={jobInfo.location}
            description={jobInfo.description}
            logo={jobInfo.logo}
          />
        {/* </Paper> */}
      </Box>
      ))}
	</>
  )
}
