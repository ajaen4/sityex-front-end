
import React from "react"

//reactstrap components
import {
  Row,
  Col
} from "reactstrap"

const NewExpControl = () => {

  return (
    <Row style = {{
      justifyContent: "center",
      textAlign: "center",
      marginTop: "30px"
    }}>
      <Col lg = "12">
      <label htmlFor="exampleFormControlTextarea1">
        <div className = "blockquote blockquote-primary">
          <p className = "bold" >Como completar los siguientes pasos</p>
          <p style = {{margin: "0px"}}>Las opciones son las siguientes:</p>
          <Row style = {{justifyContent: "center"}}>
            <Col lg = "3" style = {{alignItems: "center", textAlign: "center"}}>
              <div>5 = Muy bueno</div>
              <div>4 = Bueno</div>
            </Col>
            <Col lg = "3" style = {{alignItems: "center", textAlign: "center"}}>
              <div>3 = Sin mas</div>
            </Col>
            <Col lg = "3" style = {{alignItems: "center", textAlign: "center"}}>
              <div>2 = Malo</div>
              <div>1 = Muy malo</div>
            </Col>
          </Row>
          <p className = "bold" >Ejemplos</p>
          <Row style = {{justifyContent: "center", padding: "15px", fontSize: "0.9em"}}>
          <p>La mayor parte del tiempo llovia y anochecia muy pronto. <b>Clima = 1</b></p>
          <p>Habia 2 o 3 viajes de la ESN increibles, aunque me falto mas cantidad de planes durante el año. <b>Viajes ESN = 4</b></p>
          <p>Habia muchas discotecas con diferentes tipos de musica. Ademas, se podia salir casi cualquier dia de la semana. <b>Fiesta = 5</b></p>
          <p>Comer fuera por lo general es caro y tampoco hay una gastronomia propia. <b>Comida = 2</b></p>
          </Row>
        </div>
      </label>
      </Col>
    </Row>
  )
}

export default NewExpControl
