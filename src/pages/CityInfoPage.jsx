import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { withAuth } from "session";
import { prettyCity } from "helpers/usefulFunctions";
import { fetchCity } from "actions";

import { Box, Grid } from "@mui/material";
import SingleDataCard from "components/Cards/SingleDataCard";

import CenteredLoadingSpinner from "components/Spinner/CenteredLoadingSpinner";

import GroupsIcon from "@mui/icons-material/Groups";
import GradingIcon from "@mui/icons-material/Grading";
import PlaceIcon from "@mui/icons-material/Place";

const CityInfoPage = () => {
  const { location } = useParams();

  const selectedCity = useSelector((state) => state.selectedCity.data);
  const auth = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "City Info Page";
  }, []);

  useEffect(() => {
    dispatch(fetchCity(prettyCity(location)));
  }, [dispatch, location]);

  if (selectedCity === null || selectedCity.name !== prettyCity(location))
    return <CenteredLoadingSpinner />;

  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={2} sx={{ py: 1 }} justifyContent="center">
        <Grid item xs={10} md={3}>
          <SingleDataCard title="Users" number="553" icon={<GroupsIcon />} />
        </Grid>
        <Grid item xs={10} md={3}>
          <SingleDataCard title="Reviews" number="345" icon={<GradingIcon />} />
        </Grid>
        <Grid item xs={10} md={3}>
          <SingleDataCard
            title="Recommended places"
            number="128"
            icon={<PlaceIcon />}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withAuth(CityInfoPage);
