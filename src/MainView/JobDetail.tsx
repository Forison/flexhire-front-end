import React from 'react'
import pluralize from 'pluralize'
import { 
   Box,
   Button, 
   Card, 
   CardActionArea, 
   Stack,
   CardContent,
   CardActions,
   Typography
} from '@mui/material'
import { getInitial, positionType, salary } from '../Helpers/helperMethods'

interface CustomObject {
  name: string
}

interface Rate {
  currency: CustomObject
  formatted: string
}
interface JobSkills {
  requiredYears: number
  skill: CustomObject
  __typename: string
}
interface Job {
  title: string
  description: string
  positionTypes: string[]
  firm: CustomObject
  jobSkills: JobSkills[]
  rateMode: string
  freelancerRate: Rate
  minFreelancerRate: Rate
  __typename: string
}

interface Props {
  job: Job
}
export default function JobDetail({ job }: Props): JSX.Element {
  const { 
    title, 
    firm,
    positionTypes,
    rateMode,
    description,
    jobSkills,
    freelancerRate,
    minFreelancerRate,
  }  = job

  return (
    <Box sx={{ mt: '3.rem', mb: '3rem'}}>
      <Card>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontSize: '1rem'}}>
              <Box component='span' color="primary.main">{title}</Box> · <Box component='span' color="primary.main">{firm?.name}</Box>
            </Typography>
            <Box>
              <Typography gutterBottom variant="subtitle1" component= 'span' color="text.secondary">
                {positionType(positionTypes)}
              </Typography>
              <Typography gutterBottom variant="subtitle1" component= 'span' color="text.secondary">
                {salary(freelancerRate.formatted, minFreelancerRate.formatted)}/{rateMode}
              </Typography>
            </Box>
            <Stack
              alignItems='center'
              justifyContent='center'
              marginTop='1.5rem'
              marginBottom='1.5rem'
              spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap"
            >
               {jobSkills.map((JobSkill, index) =>(
                <Box
                  key={index}
                  className='text-nowrap p-2'
                  sx={{ 
                    borderRadius: '.75rem', 
                    fontSize: '.75rem',
                    backgroundColor: '#b3e5fc'
                  }}
                >
                  {JobSkill.skill.name} ({JobSkill.requiredYears} {pluralize('year', JobSkill.requiredYears)})
                </Box>
                ))}
            </Stack>
            <Typography variant="body2">{getInitial(description)}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Box sx={{ marginLeft: 'auto' }}>
            <Button variant='outlined'>
              Application Step
            </Button>
            <Button variant='contained' sx={{ marginLeft: '0.2rem'}}>
              View & Apply
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  )
}
