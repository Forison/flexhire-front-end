import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
import AppBar from '@mui/material/AppBar'
import { 
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  MenuItem,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SimpleBadge from './SimpleBadge'
import { BASE_API_ENDPOINT } from '../Helpers/helperMethods'
interface Prop {
  pages: string[]
}

export default function NavBar({ pages }: Prop): JSX.Element {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const cookies = new Cookies()

  const handleCloseNavMenu = () => setAnchorElNav(null)

  const handleNavigation = (page) => navigate(`${page}`)

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `${cookies.get('access_token')}`
    axios.get(`${BASE_API_ENDPOINT}/is_logged_in`)
      .then(function (response) {
        setIsLoggedIn(response.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },[])

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
        </Toolbar>
      </Container>
    </AppBar>
  )
}
