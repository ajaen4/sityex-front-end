
import React, { Component } from "react"

// Material-UI components
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Typography from "@mui/material/Typography"
import PriceChangeIcon from '@mui/icons-material/PriceChange'
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { Grid } from "@mui/material"

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

class CityInfo extends Component {

  constructor(props) {
    super(props)

    this.state =
        {
          cityName: props.cityData.displayName,
          cityData: props.cityData,
          isOpen: false,
          currencySymbol: "€"
        }
  }

  toggle = () => this.setState({ isOpen: !this.state.isOpen })

  render() {

    const {
      cityName,
      cityData,
      isOpen,
      currencySymbol
    } = this.state

    if(cityData !== null){

      const prices = cityData.prices
      const weather = cityData.weather
      const population = new Intl.NumberFormat("es-418").format(cityData.population)

      //Extract prices from document

      const rent = new Intl.NumberFormat("es-418").format(prices["Apartment (1 bedroom) Outside of Centre"].replace(",", ""))
      const apartmentCost = new Intl.NumberFormat("es-418").format(prices["Basic (Electricity, Heating, Cooling, Water, Garbage) for 85m2 Apartment"])
      const internetCost = new Intl.NumberFormat("es-418").format(prices["Internet (60 Mbps or More, Unlimited Data, Cable/ADSL)"])
      const salaryAvg = new Intl.NumberFormat("es-418").format(prices["Average Monthly Net Salary (After Tax)"].replace(",", ""))
      const mobileFee = new Intl.NumberFormat("es-418").format(prices["1 min. of Prepaid Mobile Tariff Local (No Discounts or Plans)"])
      const costOfCinema = new Intl.NumberFormat("es-418").format(prices["Cinema, International Release, 1 Seat"])
      const costOfApples = new Intl.NumberFormat("es-418").format(prices["Apples (1kg)"])
      const costOfEggs = new Intl.NumberFormat("es-418").format(prices["Eggs (regular) (12)"])
      const costOfChicken = new Intl.NumberFormat("es-418").format(prices["Chicken Breasts (Boneless, Skinless), (1kg)"])
      const costOfBeer = new Intl.NumberFormat("es-418").format(prices["Domestic Beer (0.5 liter bottle)"])
      const costOfMilk = new Intl.NumberFormat("es-418").format(prices["Milk (regular), (1 liter)"])

      const checkPrices = rent
                        + apartmentCost
                        + internetCost
                        + salaryAvg
                        + mobileFee
                        + costOfCinema
                        + costOfApples
                        + costOfEggs
                        + costOfChicken
                        + costOfBeer
                        + costOfMilk

      const checkSupermarket = costOfApples
                        + costOfEggs
                        + costOfChicken
                        + costOfBeer
                        + costOfMilk

      const histAvgTempIds = [
        {id: "first", value: 0},
        {id: "second", value: 1},
        {id: "third", value: 2},
        {id: "fourth", value: 3},
        {id: "fifth", value: 4},
        {id: "sixth", value: 5},
        {id: "seventh", value: 6},
        {id: "eight", value: 7},
        {id: "ninth", value: 8},
        {id: "tenth", value: 9},
        {id: "eleventh", value: 10},
        {id: "twelth", value:11}
          ]

      const histAvgTemp = weather.avgTemp
      let sum = 0
      for(let temp in weather.avgTemp){
        sum += parseFloat(weather.avgTemp[temp])
      }
      const histSunset= weather.sunset

      const yearAvgTemp = (sum / 12).toFixed(2)

      return (
        <Container>
          <Typography variant="h6" sx={{my: "8px"}}>
            {cityName} tiene {population} habitantes
          </Typography>
          {(rent && rent !== "0") && 
            <Typography variant="h6" sx={{my: "8px"}}>
            Precio de alquiler medio {rent + " " + currencySymbol}
            </Typography>}
          {(yearAvgTemp) &&
            <Typography variant="h6" sx={{my: "8px"}}>
            Temperatura media (año) {new Intl.NumberFormat("es-418").format(yearAvgTemp)} ºC
            </Typography>}
          <IconButton onClick={this.toggle} style={{ marginTop: '30px', marginBottom: '0px' }}>
            {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </IconButton>
          <Collapse in={isOpen}>
            <Paper style={{ padding: "30px" }}>
                <Grid container>
                  <Grid item xs={12} md={6} lg={6}>
                  {checkPrices !== 0 && 
                  <Container>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PriceChangeIcon style={{ marginLeft: '8px', marginRight: '4px' }} />
                      <Typography variant="h5"><strong>Precios</strong></Typography>
                    </div>
                    <Typography variant="caption" sx={{my: "2px"}}>Los precios están calculados en euros aunque la moneda local sea distinta</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(apartmentCost && apartmentCost !== "0") && ("Agua, electricidad, tasas de basura: " + apartmentCost + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(internetCost && internetCost !== "0") && ("Tarifa internet para el apartamento: " + internetCost + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(salaryAvg && salaryAvg !== "0") && ("Salario medio neto: " + salaryAvg + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(mobileFee && mobileFee !== "0") && ("Un minuto de tarifa de movil prepago: " + mobileFee + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(costOfCinema && costOfCinema !== "0") && ("Una entrada de cine: " + costOfCinema + " " + currencySymbol)}</Typography>
                    </Container>}
                  {checkSupermarket !== 0 && <Container>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "20px", marginBottom: "10px" }}>
                    <LocalGroceryStoreIcon style={{ marginLeft: '8px', marginRight: '4px' }} />
                    <Typography variant="h5"><strong>Bolsa de la compra</strong></Typography>
                    </div>
                    <Typography variant="body1" sx={{my: "4px"}}>{(costOfApples && costOfApples !== "0") && ("1 kg de manzanas: " + costOfApples + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(costOfEggs && costOfEggs !== "0") && ("1 docena de huevos: " + costOfEggs + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(costOfChicken && costOfChicken !== "0") && ("1 kg de pollo: " + costOfChicken + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(costOfBeer && costOfBeer !== "0") && ("1/2 L de cerveza local: " + costOfBeer + " " + currencySymbol)}</Typography>
                    <Typography variant="body1" sx={{my: "4px"}}>{(costOfMilk && costOfMilk !== "0") && ("1/2 L de leche: " + costOfMilk + " " + currencySymbol)}</Typography>
                  </Container>}
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <Container>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <WbSunnyIcon style={{ marginLeft: '8px', marginRight: '4px' }} />
                      <Typography display="inline" variant="h5"><strong>Tiempo</strong></Typography>
                    </div>
                    <Typography variant="caption" sx={{my: "2px"}}>(Temperatura media / Salida del sol)</Typography>
                    {
                      histAvgTempIds.map(number =>
                      <Typography key = {number.id} sx={{mh:"4px", my:"4px"}} style = {{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: "110px"
                      }}>
                        <b style = {{paddingLeft: "10px", paddingRight: "10px"}}>{months[number.value]}</b>
                        {new Intl.NumberFormat("es-418").format(histAvgTemp[number.value]) + "ºC "}
                        {histSunset[number.value].firstSunset}
                      </Typography>
                    )}
                  </Container>
                </Grid>
              </Grid>
            </Paper>
          </Collapse>
        </Container>
      )
    } else return null

  }
}

export default CityInfo
