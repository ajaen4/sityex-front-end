import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import { addReview, fetchCity } from "actions";
import Opinion5 from "components/Opinions/Opinion5";
import CitiesAutocomplete from "components/Autocomplete/CitiesAutocomplete";
import MapWithSearch from "components/Maps/MapWithSearch";
import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";
import ActionModal from "components/Modals/ActionModal";
import TextArea from "components/TextArea/TextArea";

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm();
  const dispatch = useDispatch();

  let mapContainer = useRef(null);

  const [noPlaces, setNoPlaces] = useState(false);
  const [placesInDB, setplacesInDB] = useState([]);
  const [currPlaces, setCurrPlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const citiesIndex = useSelector((state) => state.citiesIndex.data);
  const auth = useSelector((state) => state.auth.data);

  const onChangeCity = (event, selectedCity) => {
    if (selectedCity) dispatch(fetchCity(selectedCity.city_id));
  };

  const updatePlaces = (places) => setCurrPlaces(places);

  const resetForm = () => {
    setModalMessage("");
    setCurrPlaces([]);
    reset();
  };

  const handleForm = (data) => {
    if (currPlaces.length === 0) {
      window.scrollTo(0, mapContainer.current.offsetTop);
      setNoPlaces(true);
      return;
    }

    data.userName = auth.userName;
    data.userId = auth.id;
    setIsFetching(true);
    dispatch(addReview(selectedCity.city_id, data, currPlaces))
      .then(() => {
        setIsFetching(false);
        setModalMessage("Your review has been successfully uploaded!");
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      })
      .catch((err) => {
        setIsFetching(false);
        setModalMessage("There was an error. Please try again");
      });
  };

  return (
    <>
      <Typography variant="h2" color="textSecondary" sx={{ my: 3 }}>
        Fill in a review
      </Typography>
      <form onSubmit={handleSubmit(handleForm)} style={{ textAlign: "center" }}>
        {isFetching && <CenteredLoadingSpinner />}
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ my: 4 }}
        >
          <Grid item xs={8} md={3} lg={2}>
            <CitiesAutocomplete
              selectedCity={selectedCity ? selectedCity : null}
              citiesIndex={citiesIndex ? citiesIndex.cities : null}
              onChangeCity={onChangeCity}
            />
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ my: 4 }}
        >
          <Grid item xs={12} md={8}>
            <Grid container justifyContent="center" textAlign="center">
              <Grid item xs={12} md={6}>
                <Opinion5
                  control={control}
                  fieldName="weather"
                  labelName="Weather"
                  register={register}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Opinion5
                  control={control}
                  fieldName="food"
                  labelName="Food"
                  register={register}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Opinion5
                  control={control}
                  fieldName="social"
                  labelName="Social Atmosphere"
                  register={register}
                  errors={errors}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Opinion5
                  control={control}
                  fieldName="trips"
                  labelName="Accessibility"
                  register={register}
                  errors={errors}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          textAlign="center"
          sx={{ my: 4 }}
          ref={mapContainer}
        >
          <Grid item xs={12} md={12}>
            <Typography
              variant="h3"
              color="textSecondary"
              style={{ marginBottom: 30, fontWeight: "bold" }}
            >
              Recommend places in city!
            </Typography>
          </Grid>
          <Grid item xs={11} md={8}>
            <MapWithSearch
              selectedCity={selectedCity ? selectedCity : null}
              updateFormPlaces={updatePlaces}
              noPlaces={noPlaces}
              setNoPlaces={setNoPlaces}
            />
          </Grid>
        </Grid>
        <Stack>
          <FormControl>
            <Typography
              variant="h3"
              color="textSecondary"
              style={{ fontWeight: "bold" }}
            >
              Give some advice about the city!
            </Typography>

            <Grid
              container
              justifyContent="center"
              textAlign="center"
              sx={{ my: 3 }}
            >
              <Grid item xs={10} md={8}>
                <TextArea name="advice" register={register} errors={errors} />
              </Grid>

              <Grid item xs={10} md={8}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </Stack>
      </form>
      {modalMessage !== "" && (
        <ActionModal
          show={true}
          title=""
          message={modalMessage}
          action={resetForm}
        />
      )}
    </>
  );
};

export default ReviewForm;
