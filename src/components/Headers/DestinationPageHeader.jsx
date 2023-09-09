import React from "react"
import { Box, Typography, Grid } from "@mui/material"
import { prettyCity } from 'helpers/usefulFunctions'


function DestinationPageHeader({cityName, countryName, numExp}) {
  
  const cityImagesContext = require.context('assets/img/city', false, /\.jpg$/);

  const cityImages = cityImagesContext.keys().reduce((images, path) => {
    const cityName = path.replace('./', '').replace('.jpg', '');
    images[cityName] = cityImagesContext(path);
    return images;
  }, {});

  const cityImagePath = cityImages[prettyCity(cityName)];

  return (
      <Box
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${cityImagePath})`,
          py: 20,
          minHeight: 400,
          backgroundSize: "cover",
          color:"#ebe8e8"
        }}
        align="center"
      >
        <Typography variant="h3" >{cityName}</Typography>
        <Typography variant="h6">{countryName}</Typography>
        <Grid container sx={{ justifyContent: "center" }}> 
          <Grid item xs={4} md={2} lg={2}>
            <Typography variant="h3">{numExp}</Typography>
            <Typography variant="body1"><b>Experiencias</b></Typography>
          </Grid>
          <Grid item xs={4} md={2} lg={2}>
            <Typography variant="h3">0</Typography>
            <Typography variant="body1"><b>Personas</b></Typography>
          </Grid>
        </Grid>
    </Box>
  )
}

export default DestinationPageHeader