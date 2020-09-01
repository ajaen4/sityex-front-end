
import React from "react"

//reactstrap components
import {
  Row,
  Col,
  FormGroup,
  Input
} from "reactstrap"

//Custom functionality
import { prettyCity } from 'helpers/usefulFunctions'


const CitiesDropDown = ({citiesList, onChangeCity}) => {

  return (
    <Row style = {{
      justifyContent: "center",
      textAlign: "center"}} >
      <Col lg = "6">
        <FormGroup  style ={{
        justifyContent: "center",
        textAlign: "center"}} >
          <label htmlFor="exampleFormControlSelect1">En que ciudad has estado?</label>
          <Input
          onChange = {onChangeCity}
          id="exampleFormControlSelect1"
          className="form-control-lg"
          type="select">
          {citiesList !== null && citiesList.sort().map( item =>
            <option
            tag="a"
            href = "#"
            name = {item}
            id = {item + "_option"}
            key = {item} >
            {prettyCity(item)}
            </option>
          )
          }
          </Input>
        </FormGroup>
      </Col>
    </Row>
  )
}

export default CitiesDropDown
