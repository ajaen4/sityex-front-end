import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

// Custom functionality
import { withAuth } from 'session'
import { objectIsEmpty } from 'helpers/usefulFunctions'

// Material-UI components
import {
  Container,
  Tab,
  Tabs,
  Card,
  CardContent,
  Typography,
  InputBase,
  IconButton,
  Grid,
  InputAdornment,
  Box
} from '@mui/material'
import ListIcon from '@mui/icons-material/List'
import MapIcon from '@mui/icons-material/Map'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'

// Custom UI components
import DefaultFooter from 'components/Footers/DefaultFooter'
import ScrollDestinations from 'components/ScrollList/ScrollDestinations'
import DestinationsMap from 'components/GoogleMaps/DestinationsMap'
import JustLoggedInModal from 'components/Modals/JustLoggedInModal'
import UserJustCreatedModal from 'components/Modals/UserJustCreatedModal'

const HomePage = ({ citiesIndex, isFetching, authUser }) => {
  const [tabValue, setTabValue] = useState(0)
  const [city, setCity] = useState('')
  const [windowWidth, setwindowWidth] = React.useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', updatewindowWidth)
    return () => window.removeEventListener('resize', updatewindowWidth)
  }, [])

  const updatewindowWidth = () => {
    setwindowWidth(window.innerWidth)
  }

  const onSearchChange = (event) => setCity(event.target.value)

  const getDestinations = () => {
    if (citiesIndex !== null)
      return Object.values(citiesIndex).filter(item => item.name.toLowerCase().includes(city.toLowerCase())).sort((a, b) => a.name.localeCompare(b.name))
    else
      return []
  }

  return (
    <>
      <JustLoggedInModal justLoggedIn={authUser.justLoggedIn} title="Inicio de sesion" message="Se ha iniciado sesion correctamente" />
      <UserJustCreatedModal userJustCreated={authUser.userJustCreated} title="Nuevo usuario" message="Se ha creado el usuario correctamente" />
      <Container style={{
        textAlign: 'center',
        justifyContent: 'center'
        }}
        sx={{my: 15}}
      >
        <Tabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          onChange={(_, newValue) => setTabValue(newValue)}
          centered
          sx={{my: 5}}
        >
          <Tab icon={<ListIcon />} />
          <Tab icon={<MapIcon />} />
        </Tabs>
        <Container>
          {tabValue === 0 && (
            <Grid container spacing={2} sx={{ justifyContent: "center"}}>
              <Grid item xs={11} md={7} lg={7} xl={7}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">Introduce un destino</Typography>
                    <InputBase
                      startAdornment={
                        <InputAdornment position="start">
                          <IconButton>
                            <TravelExploreIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Ej. Turin..."
                      value={city}
                      onChange={onSearchChange}
                      fullWidth
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={11} md={7} lg={7} xl={7}>
                <Card style={{ minHeight: '300px' }}>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary">Destinos</Typography>
                    <ScrollDestinations isFetching={isFetching}
                      destinations={getDestinations()} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          {tabValue === 1 && (
              <Box justifyContent="center">
                <DestinationsMap
                  windowWidth={windowWidth}
                  citiesIndex={objectIsEmpty(citiesIndex) ? {} : citiesIndex}
                />
                <Grid container justifyContent="center" spacing={2} sx={{"my": "10px"}}>
                  <Grid item display="flex" justifyContent="center" xs={12}>
                    <img alt="selected place icon" src={require('assets/icons/pin_green.png')} style={{ height: '30px' }} />
                    <Typography variant="body1" style={{ marginLeft: '10px', marginTop: '3px'}}>
                      Ciudades con mas de un millon de habitantes
                    </Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="center" xs={12}>
                    <img alt="selected place icon" src={require('assets/icons/pin_blue.png')} style={{ height: '30px' }} />
                    <Typography variant="body1" style={{ marginLeft: '10px', marginTop: '3px'}}>
                      Ciudades con habitantes entre 800 y 300 mil
                    </Typography>
                  </Grid>
                  <Grid item display="flex" justifyContent="center" xs={12}>
                    <img alt="selected place icon" src={require('assets/icons/pin_orange.png')} style={{ height: '30px' }} />
                    <Typography variant="body1" style={{ marginLeft: '10px', marginTop: '3px'}}>
                    Ciudades con menos de 300 mil habitantes
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
          )}
        </Container>
      </Container>
      <DefaultFooter />
    </>
  )
}

const mapStateToProps = state => ({
  citiesIndex: state.citiesIndex.data,
  authUser: state.auth,
  isFetching: state.citiesIndex.isFetching,
  savedExperience: state.experiences.message
})

export default connect(mapStateToProps)(withAuth(HomePage))
