import React from 'react'
import { gql, useQuery } from '@apollo/client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Avatar, Box, Button, Stack } from '@mui/material'
import Notice from '../AlertBanner/Notice'

const USER_PROFILE_QUERY = gql`
  {
    user(id: "dXNlcnMtMzAwOQ==") {
      name
      avatarUrl
      profile{
        textIntroduction
      }
      userSkills{
        experience
        skill {
          name
        }
      }
    }
  }
`

export default function ProfileTop(): JSX.Element {
  const { data, error } = useQuery(USER_PROFILE_QUERY)
  console.log(data)
  if (error) return <Notice status={error.message} isSuccess={false} />
  return (
    <Card>
      <Box>
        <Box sx={{ height: '500px', backgroundColor: 'info.main'}}>
          <Avatar
            alt="Remy Sharp"
            src={data?.user?.avatarUrl}
            sx={{ 
              width: 150,
              height: 150,
              left: '43%',
              top: 380,
              position: 'absolute',
          }}/>
        </Box>
        <CardContent>
          <Typography gutterBottom variant='h5' className='text-center mt-5'>
            {data?.user?.name}
          </Typography>
          <Stack 
            direction='row'
            spacing={2}
            alignItems='center'
            justifyContent='center'
            marginTop='1.5rem'
            marginBottom='1.5rem'
          >
            {data?.user?.userSkills.map((userSkill, index) => (
              <Button
                key={index}
                variant='outlined'
                className='text-nowrap'
              >
                  {userSkill.skill.name} {userSkill.experience}
                </Button>
            ))}
          </Stack>
          <Typography variant='body2' gutterBottom className='text-center'>
          {data?.user?.profile?.textIntroduction}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}
