import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Company } from '../Interface/Company'
import { BASE_API_ENDPOINT, POSITIVE_FEEDBACK, getInitial } from '../Helpers/helperMethods'
import { Paper } from '@mui/material'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function JobDetail({
  name,
  location,
  description,
  poster_url,
  creation_date,
  elevation = 5,
  jobId,
}: Company): JSX.Element {
  const [expanded, setExpanded] = useState(false)
  const [like, setlike] = useState(false)

  const handleExpandClick = () => setExpanded(!expanded)

  const handleFavorite = () => {
    axios.patch(`${BASE_API_ENDPOINT}/like_job/${jobId}`)
      .then(function (response) {
        if(response.status === POSITIVE_FEEDBACK){
          setlike(response.data.has_like)
        }
      })
      .catch(function (error) {
        return error
      })
  }
 
  useEffect(()=> {
    const cookies = new Cookies()
    axios.defaults.headers.common['Authorization'] = `${cookies.get('access_token')}`
    axios.get(`${BASE_API_ENDPOINT}/favorite_job/${jobId}`)
      .then(function (response) {
        if(response.status === POSITIVE_FEEDBACK){
          setlike(response.data.has_like)
        }
      })
      .catch(function (error) {
        return error
      })
  },[])

  return (
    <Paper elevation={elevation > 24 ? elevation - 1 : elevation}>
      <CardHeader
        avatar={
          <Avatar sx={{ 
            bgcolor: red[500],
            textTransform: 'uppercase'
          }} 
            aria-label="job">
            {getInitial(name, 1)}
          </Avatar>
        }
        title={name}

        subheader={`${creation_date}`}
      />
      <CardMedia
        component="img"
        height="150"
        image={`${BASE_API_ENDPOINT}${poster_url}`}
        alt="Paella dish"
      />
      <Typography variant="body1" sx={{ margin: '1rem' }}>Location: {location}</Typography>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {getInitial(description, 40)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavorite}>
          <FavoriteIcon sx={{color: like ? 'secondary.main' : 'danger.main'}} />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Paper>
  )
}
