import React from "react"
import { Card, Container, Grid, Typography } from "@mui/material"
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import CelebrationIcon from '@mui/icons-material/Celebration'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'

const Experience = ({ data }) => {

  const avgRating = (Number(data.weather) + Number(data.food) + Number(data.party) + Number(data.trips)) / 4;
  const formattedDate = data.timeStamp.toDate().toLocaleDateString();

  return (
    <Card sx={{width: "100%", padding: 2}}>
      <Container style={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ padding: 7 }}>
            <Typography variant="h6" component="span">
              {data.userName} · {formattedDate}
            </Typography>
            <span style={{ paddingLeft: "10px", fontWeight: "bold" }}>Media:</span>
            <span style={{ paddingLeft: "5px" }}>
              {avgRating}
            </span>
            <Grid container spacing={2} justifyContent="center" style={{padding: 10}}>
              <Grid item lg={3} md={3} sm={6} xs={6} >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <WbSunnyIcon style={{ marginLeft: '8px', marginRight: '8px' }} />
                  <Typography display="inline">
                    <strong>Clima:</strong> {data.weather}
                  </Typography>
                </div>
              </Grid>

              <Grid item lg={3} md={3} sm={6} xs={6} >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FastfoodIcon style={{ marginLeft: '8px', marginRight: '8px' }}/>
                  <Typography display="inline">
                    <strong>Comida:</strong> {data.food}
                  </Typography>
                </div>
              </Grid>

              <Grid item lg={3} md={3} sm={6} xs={6}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <CelebrationIcon style={{ marginLeft: '8px', marginRight: '8px' }}/>
                  <Typography display="inline" >
                    <strong>Fiesta:</strong> {data.party}
                  </Typography>
                </div>
              </Grid>

              <Grid item lg={3} md={3} sm={6} xs={6}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <TravelExploreIcon style={{ marginLeft: '8px', marginRight: '8px' }}/>
                  <Typography display="inline" >
                    <strong>Viajes ESN:</strong> {data.trips}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Typography component="div" style={{ marginTop: "15px", marginRight: "15px", marginLeft: "10px", marginBottom: "0px", border: "1px solid #B3D4FF", borderRadius: "5px", padding: "10px", maxHeight: "200px" }}>
              <strong style={{ fontSize: "0.9rem" }}>Consejo</strong>
              <p style={{ fontSize: "0.8rem" }}>{data.advice}</p>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Card>
  )
}

export default Experience