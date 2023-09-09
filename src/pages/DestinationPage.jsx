import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { withAuth } from 'session'
import { prettyCity } from 'helpers/usefulFunctions'
import { fetchCity, getExperiences } from 'actions'
import { Container, Tab, Tabs, Box, Typography, Grid } from '@mui/material'

import DestinationPageHeader from 'components/Headers/DestinationPageHeader'
import DefaultFooter from 'components/Footers/DefaultFooter'
import RecomenMap from 'components/GoogleMaps/RecomenMap'
import ScrollExperiences from 'components/ScrollList/ScrollExperiences'
import CityInfo from 'components/CityData/CityInfo'
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'

const DestinationPage = ({ selectedCity, auth, isFetchingExperiences, dispatch }) => {
  const [value, setValue] = useState(0)
  const [experiences, setExperiences] = useState([])
  const { location } = useParams()

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)))

    getExperiences(prettyCity(location))
      .then(experiences => {
        setExperiences(experiences.sort((a, b) => b.timeStamp - a.timeStamp))
      })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location])

  if (selectedCity === null || (selectedCity.name !== prettyCity(location))) return <CenteredLoadingSpinner />

  return (
    <>
      <DestinationPageHeader cityName={selectedCity.displayName} countryName={selectedCity.countryName} numExp={experiences.length} />
      <Container align="center">
        <Typography variant="h4" sx={{my: 5}}>Características</Typography>
        <CityInfo cityData={selectedCity} />
        <Typography variant="h4" sx={{my: 5}}>Áreas</Typography>
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          centered
        >
          <Tab label="Experiences"/>
          <Tab label="Map" />
        </Tabs>
        <Box>
          {value === 0 && (
            <Grid container align="center">
              <Grid item sm={12} md={12} lg={12}>
                <ScrollExperiences experiences={experiences} isFetching={isFetchingExperiences} />
              </Grid>
            </Grid>
          )}
          {value === 1 && (
            <Grid container justifyContent="center">
              <Grid item sm={12} md={12} lg={12}>
                <RecomenMap coordinates={{ lat: selectedCity.latitude, lng: selectedCity.longitude }} recomendations={selectedCity.mapMarkers === undefined ? [] : selectedCity.mapMarkers} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
      <DefaultFooter />
    </>
  )
}

const mapStateToProps = state => ({
  selectedCity: state.selectedCity.data,
  auth: state.auth.data,
  isFetchingExperiences: state.experiences.isFetching,
})

export default connect(mapStateToProps)(withAuth(DestinationPage))
