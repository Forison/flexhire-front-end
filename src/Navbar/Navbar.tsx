import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import { gql, useQuery } from '@apollo/client'
import { 
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
  Avatar,
  Stack,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SimpleBadge from './SimpleBadge'

interface Prop {
  pages: string[]
}

const USER_QUERY = gql`
  {
    user(rawId: 3009) {
      name
      avatarUrl
    }
  }
`

export default function NavBar({ pages }: Prop): JSX.Element {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const { data } = useQuery(USER_QUERY)

  const navigate = useNavigate()
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => setAnchorElNav(null)
  
  const handleNavigation = (page) => navigate(`${page}`)

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={ ()=> handleNavigation(page)}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MenuItem
                key={page}
                onClick={() => handleNavigation(page)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </MenuItem>
            ))}
          </Box>    
          <Box sx={{ mr: '1.6rem' }}>
            <SimpleBadge />
          </Box>
          <Stack spacing={{ xs: 1, sm: 0 }} useFlexGap flexWrap="wrap">
            <IconButton>
              <Avatar alt='Me' src={data?.user?.avatarUrl} />
            </IconButton>
            <Typography sx={{ fontSize: '.75rem'}}>{data?.user?.name}</Typography>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
