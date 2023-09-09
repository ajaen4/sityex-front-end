import React from "react"
import { Link } from "react-router-dom"

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Box,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { signOutUser } from 'actions'

const MainNavbar = ({ auth, isAuthResolved }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)

  const signOut = (user_id) => {
    signOutUser(user_id)
    setAnchorEl(false)
  }

  return (
    <>
      <AppBar position="fixed" color="primary">
        <Container>
          <Toolbar>
            <Typography variant="h6"  sx={{ mr: "60px"}}>
              SityEx
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {isAuthResolved && <MenuItem sx={{ mx: "10px"}} component={Link} to="/new-experience">Nueva opinion</MenuItem> }
              {isAuthResolved && <MenuItem sx={{ mx: "10px"}} component={Link} to="/Home">Destinos</MenuItem>}
            </Box>
            {isAuthResolved &&
            <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={(event) => setAnchorEl(event.currentTarget)}>
            <MenuIcon />
            </IconButton>
             <Menu 
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block' },
              }}
            >
              <MenuItem>Algun problema?</MenuItem>
              <MenuItem onClick={e => e.preventDefault()}>{" " + auth.userName + " "}</MenuItem> 
              <MenuItem onClick={e => signOut(auth.id)}>Cerrar sesion</MenuItem>
            </Menu>
            </>}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}

export default MainNavbar
