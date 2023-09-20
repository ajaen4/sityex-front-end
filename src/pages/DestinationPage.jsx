import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { withAuth } from 'session'
import { prettyCity } from 'helpers/usefulFunctions'
import { fetchCity, getReviews } from 'actions'
import { Container, Tab, Tabs, Box, Typography, Grid } from '@mui/material'

import DestinationPageHeader from 'components/Headers/DestinationPageHeader'
import RecomendationsMap from 'components/Maps/RecomendationsMap'
import ScrollReviews from 'components/ScrollList/ScrollReviews'
import CityInfo from 'components/CityData/CityInfo'
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'

const DestinationPage = ({ selectedCity, auth, isFetchingReviews, dispatch }) => {
  const [value, setValue] = useState(0)
  const [reviews, setreviews] = useState([])
  const { location } = useParams()

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)))

    getReviews(prettyCity(location))
      .then(reviews => {
        setreviews(reviews.sort((a, b) => b.timeStamp - a.timeStamp))
      })
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location])

  if (selectedCity === null || (selectedCity.name !== prettyCity(location))) return <CenteredLoadingSpinner />

  return (
    <>
      <DestinationPageHeader cityName={selectedCity.displayName} countryName={selectedCity.countryName} numExp={reviews.length} />
      <Container align="center">
        <Typography variant="h4" sx={{my: 5}}>Characteristics</Typography>
        <CityInfo cityData={selectedCity} />
        <Typography variant="h4" sx={{my: 5}}>Areas</Typography>
        <Tabs
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          centered
        >
          <Tab label="reviews"/>
          <Tab label="Map" />
        </Tabs>
        <Box>
          {value === 0 && (
            <Grid container align="center">
              <Grid item sm={12} md={12} lg={12}>
                <ScrollReviews reviews={reviews} isFetching={isFetchingReviews} />
              </Grid>
            </Grid>
          )}
          {value === 1 && (
            <Grid container justifyContent="center">
              <Grid item sm={12} md={12} lg={12} style={{height: "400px", width: "100%"}}>
                <RecomendationsMap selectedCity={selectedCity} />
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  )
}

const mapStateToProps = state => ({
  selectedCity: state.selectedCity.data,
  auth: state.auth.data,
  isFetchingReviews: state.reviews.isFetching,
})

export default connect(mapStateToProps)(withAuth(DestinationPage))
