import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
  IconButton,
  Grid,
  InputAdornment,
  Box,
  Autocomplete,
  TextField
} from '@mui/material'
import ListIcon from '@mui/icons-material/List'
import MapIcon from '@mui/icons-material/Map'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'

// Custom UI components
import DestinationsMap from 'components/Maps/DestinationsMap'

const HomePage = ({ citiesIndex, isFetching, authUser }) => {
  const [tabValue, setTabValue] = useState(0)
  const navigate = useNavigate()

  const onSearchChange = (event, value) => navigate("/destination/" + value.cityName)

  const getDestinations = () => {
    if (citiesIndex !== null)
      return Object.values(citiesIndex).sort((a, b) => a.name.localeCompare(b.name)).map(cityData => ({
        cityName: cityData.name,
        countryCode: cityData.countryCode
      }))
    else
      return []
  }

  return (
    <Container style={{
      textAlign: 'center',
      justifyContent: 'center',
      minHeight: '76vh',
      }}
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
                  <Autocomplete
                    freeSolo
                    style={{marginTop: '20px'}}
                    options={getDestinations()}
                    onChange={onSearchChange}
                    getOptionLabel={(option) => option.cityName}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: (
                            <InputAdornment position="start">
                              <IconButton>
                                <TravelExploreIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                        placeholder="Ej. Turin..."
                        fullWidth
                      />
                    )}
                    renderOption={(props, option) => (
                      <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                          loading="lazy"
                          width="20"
                          src={`https://flagcdn.com/w20/${option.countryCode.toLowerCase()}.png`}
                          srcSet={`https://flagcdn.com/w40/${option.countryCode.toLowerCase()}.png 2x`}
                          alt=""
                        />
                        {option.cityName}
                      </Box>
                    )}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
        {tabValue === 1 && (
          <Box justifyContent="center">
            <DestinationsMap
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
  )
}

const mapStateToProps = state => ({
  citiesIndex: state.citiesIndex.data,
  authUser: state.auth,
  isFetching: state.citiesIndex.isFetching,
  savedExperience: state.experiences.message
})

export default connect(mapStateToProps)(withAuth(HomePage))