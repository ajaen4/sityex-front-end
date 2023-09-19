import React, { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { addReview } from 'actions'
import Opinion5 from 'components/Opinions/Opinion5'
import CitiesDropDown from 'components/DropDownList/CitiesDropDown'
import MapWithSearch from 'components/Maps/MapWithSearch'
import CenteredLoadingSpinner from 'components/Spinner/CenteredLoadingSpinner'
import ActionModal from 'components/Modals/ActionModal'
import TextArea from 'components/TextArea/TextArea'

const ReviewFormBase = ({ selectedCity, onChangeCity, citiesIndex, dispatch, auth }) => {
  const { register, handleSubmit, formState: { errors }, control, reset } = useForm()
  const navigate = useNavigate()

  let mapContainer = useRef(null)

  const [noRecomendations, setNoRecomendations] = useState(false)
  const [currRecomendations, setCurrRecomendations] = useState([])
  const [isFetching, setIsFetching] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const goToDestinations = () => navigate("/home")

  const updateRecomendations = recomendations => setCurrRecomendations(recomendations)

  const resetForm = () => {
    setModalMessage("")
    setCurrRecomendations([])
    reset()
  }

  //Stop form from submitting in a standar way (problems with the Autocomplete Google Maps function when pressing enter)
  const handleForm = data => {
    if(currRecomendations.length === 0){
      window.scrollTo(0, mapContainer.current.offsetTop)
      setNoRecomendations(true)
    }
    else {
      data.userName = auth.userName
      data.userId = auth.id
      setIsFetching(true)
      dispatch(addReview(selectedCity.name, data, currRecomendations))
      .then(() => {
        setIsFetching(false)
        setModalMessage("Su experiencia se ha guardado correctamente")
        setTimeout(() => {
          goToDestinations()
        }, 2500);
      })
      .catch(err => {
        setIsFetching(false)
        setModalMessage("Ha ocurrido un problema. Por favor, vuelva a intentarlo")
      })
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleForm)} style={{ marginTop: '20px', textAlign: 'center' }}>
        {isFetching && <CenteredLoadingSpinner />}
        <Container sx={{ textAlign: 'center' }}>
          <CitiesDropDown label='Which city have you lived in?' citiesList={Object.keys(citiesIndex)} onChangeCity={onChangeCity} selectedCity={selectedCity ? selectedCity.name : null}/>
          <Grid container justifyContent='center' textAlign='center' sx={{my: "5px"}}>
            <Grid item xs={12} sm={6} md={6}>
              <Opinion5 control={control} fieldName='weather' labelName='Weather' register={register} errors={errors} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Opinion5 control={control} fieldName='food' labelName='Food' register={register} errors={errors} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Opinion5 control={control} fieldName='social' labelName='Social Atmosphere' register={register} errors={errors} />
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Opinion5 control={control} fieldName='trips' labelName='Accessibility' register={register} errors={errors} />
            </Grid>
          </Grid>
        </Container>
        <Container style={{
          marginTop: '30px',
          textAlign: 'center',
          width: '100%',
        }}
          ref={mapContainer}>
          <Typography variant='h3' style={{marginBottom: 30, fontWeight: "bold"}}> Recommend places in city! </Typography>
          <MapWithSearch selectedCity={selectedCity} updateRecomendations={updateRecomendations}/>
          <Container sx={{minHeight: "20px", marginTop: "10px"}}>
            {noRecomendations &&
              <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setNoRecomendations(false)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              >
                <AlertTitle>Please set at least one place recommendation</AlertTitle>
              </Alert>
            }
          </Container>
        </Container>
        <Stack style={{ textAlign: 'center', alignItems: "center" }}>
          <FormControl style={{ padding: '30px' }}>
            <Typography variant='h3' style={{marginBottom: "15px", fontWeight: "bold"}}>Give some advice about the city!</Typography>
            <TextArea name='advice' register={register} errors={errors} />
          </FormControl>
          <Button
            style={{ marginBottom: '100px' }}
            variant='contained'
            color='primary'
            type='submit'>
            Submit
          </Button>
        </Stack>
      </form>
      {modalMessage !== '' && <ActionModal show={true} title='' message={modalMessage} action={resetForm} />}
    </>
  )
}

export default ReviewFormBase
