
import React, {Component} from "react"

// reactstrap components
import {
  Container,
  Collapse,
  Card,
  CardBody
} from "reactstrap"

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

  toggle = () => this.setState({isOpen: !this.state.isOpen})

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
        <Container className = "centerText" style = {{
          fontSize: "17px",
          padding: "0px"
        }}>
          <div className = "rowMainCharact">
          <i className="now-ui-icons users_single-02" style = {{
            marginTop: "3px",
            marginRight: "7px",
          }}></i>
          <div>{cityName} tiene <b>{population} habitantes</b></div>
          </div>
          {(rent && rent !== "0") && <div className = "rowMainCharact" >
          <i className="now-ui-icons shopping_shop" style = {{
            marginTop: "3px",
            marginRight: "6px"
          }}></i>
          <div>Precio de alquiler medio <b>{rent + " " + currencySymbol}</b></div>
          </div>}
          {(yearAvgTemp) && <div className = "rowMainCharact">
          <img alt = "temperature icon" src = {require("assets/icons/temperature.png")} style = {{
            marginTop:"2px",
            marginRight: "4px",
            marginLeft: "5px",
            height: "20px"
          }}></img>
          <div>Temperatura media (año) <b>{new Intl.NumberFormat("es-418").format(yearAvgTemp)} ºC</b></div>
          </div>}
          <i className = {"now-ui-icons" + (isOpen ? " arrows-1_minimal-up" : " arrows-1_minimal-down")} onClick={this.toggle} style={{
            marginTop: '30px',
            marginBottom: "0px"
          }}></i>
          <Collapse isOpen={isOpen} style = {{
            marginLeft: "0px !important"
          }}>
            <Card>
              <CardBody className = "rowDirection rowWrap">
                {checkPrices !== 0 && <Container style = {{
                  width:"49%",
                  minWidth: "330px"
                }}>
                <div className = "rowMainCharact">
                  <i className="now-ui-icons business_money-coins" style = {{
                    marginTop: "7px",
                    marginRight: "5px"
                  }}></i>
                  <h5 className="bold" style = {{
                    marginBottom: "0px"
                  }}>Precios</h5>
                </div>
                <div style = {{
                  fontSize: "13px",
                  marginBottom: "15px"
                }}>(Los precios están calculados en euros aunque la moneda local sea distinta)</div>
                  <div className = "extraBotMargin">{(apartmentCost && apartmentCost !== "0") && ("Agua, electricidad, tasas de basura: " + apartmentCost + " " + currencySymbol)}</div>
                  <div className = "extraBotMargin">{(internetCost && internetCost !== "0") && ("Tarifa internet para el apartamento: " + internetCost + " " + currencySymbol)}</div>
                  <div className = "extraBotMargin">{(salaryAvg && salaryAvg !== "0") && ("Salario medio neto: " + salaryAvg + " " + currencySymbol)}</div>
                  <div className = "extraBotMargin">{(mobileFee && mobileFee !== "0") && ("Un minuto de tarifa de movil prepago: " + mobileFee + " " + currencySymbol)}</div>
                  <div className = "extraBotMargin">{(costOfCinema && costOfCinema !== "0") && ("Una entrada de cine: " + costOfCinema + " " + currencySymbol)}</div>
                  {checkSupermarket !== 0 && <Container>
                  <div className = "rowMainCharact" style ={{
                    marginTop:"22px",
                    marginBottom:"10px"
                  }}>
                    <i className="now-ui-icons shopping_cart-simple" style = {{
                      marginTop: "0px",
                      marginRight: "5px"
                    }}></i>
                    <h6 className="bold">Bolsa de la compra</h6>
                </div>
                <div className = "extraBotMargin">{(costOfApples && costOfApples !== "0") && ("1 kg de manzanas: " + costOfApples + " " + currencySymbol)}</div>
                <div className = "extraBotMargin">{(costOfEggs && costOfEggs !== "0") && ("1 docena de huevos: " + costOfEggs + " " + currencySymbol)}</div>
                <div className = "extraBotMargin">{(costOfChicken && costOfChicken !== "0") && ("1 kg de pollo: " + costOfChicken + " " + currencySymbol)}</div>
                <div className = "extraBotMargin">{(costOfBeer && costOfBeer !== "0") && ("1/2 L de cerveza local: " + costOfBeer + " " + currencySymbol)}</div>
                <div className = "extraBotMargin">{(costOfMilk && costOfMilk !== "0") && ("1/2 L de leche: " + costOfMilk + " " + currencySymbol)}</div>
                </Container>
                }
                </Container>
                }
                <Container style = {{
                  width: "49%",
                  minWidth: "330px"
                }}>
                  <div className = "rowMainCharact">
                    <img alt = "sun icon" src = {require("assets/icons/sun.png")} style = {{
                      marginTop:"5px",
                      marginRight: "5px",
                      marginLeft: "5px",
                      height: "20px"
                    }}></img>
                    <h5 className="bold" style = {{
                      marginBottom: "0px"
                    }} >Tiempo</h5>
                  </div>
                  <div style = {{
                    fontSize: "13px",
                    marginBottom: "15px"
                  }}>(Temperatura media / Salida del sol)</div>
                  {
                    histAvgTempIds.map(number =>
                    <div key = {number.id} className = "extraBotMargin rowDirection">
                      <div className = "RightText" style = {{
                        minWidth: "105px"
                      }}><b>{months[number.value]}</b>
                      </div>
                      <img alt = "temperature icon" src = {require("assets/icons/temperature.png")} style = {{
                        marginTop: "2px",
                        marginRight: "1%",
                        marginLeft: "1%",
                        height: "20px"
                      }}></img>
                      <div className = "LeftText" style = {{
                        minWidth: "70px"
                      }}> {new Intl.NumberFormat("es-418").format(histAvgTemp[number.value]) + " ºC"}
                      </div>
                      <img alt = "sunset icon" src = {require("assets/icons/sunset.png")} style = {{
                        marginTop:"0px",
                        marginRight: "1%",
                        marginLeft: "1%",
                        height: "20px"
                      }}></img>
                      <div className = "LeftText" style = {{
                        minWidth: "85px"
                      }}> {histSunset[number.value].firstSunset}
                      </div>
                    </div>
                  )}
                </Container>
              </CardBody>
            </Card>
          </Collapse>
        </Container>
      )
  } else return null

  }
}

export default CityInfo
