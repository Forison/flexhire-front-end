import React, { useState } from 'react'
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Company } from '../Interface/Company'
import { getInitial } from '../Helpers/helperMethods'
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
  logo,
  elevation = 5,
}: Company): JSX.Element {
  // rely on api call to initialize 
  const [expanded, setExpanded] = useState(false)
  const [like, setlike] = useState(false)
  const [share, setShare] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleFavorite = () => {
    setlike(!like)
  }

  const handleShare = () => {
    setShare(!share)
  }

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
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${name} ${location}`}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={logo}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {getInitial(description, 150)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleFavorite}>
          <FavoriteIcon sx={{color: like ? 'secondary.main' : 'danger.main'}} />
        </IconButton>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon sx={{color: share ? 'secondary.main' : 'danger.main'}}/>
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
