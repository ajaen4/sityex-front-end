import React , { useState }from "react"

import 'react-dates/lib/css/_datepicker.css';

// reactstrap components
import {
  Container
} from "reactstrap"

// Import Moment and React Dates
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';


const DateSelector = ({register, errors, orgValue, fieldName, label}) => {

  const [date, setDate] = useState(moment())
  const [focus, setFocus] = useState(false)

  return (
    <Container>
    <div style = {{fontSize: "medium", marginBottom: "8px"}}>{label}</div>
    <SingleDatePicker
      date = {date} // momentPropTypes.momentObj or null
      onDateChange = {date => setDate(date)} // PropTypes.func.isRequired
      focused = {focus} //false para que no se extienda la vista
      onFocusChange = {() => setFocus(focus ? false : true)}
      id="day_of_birth"/>
    </Container>
  )
}

export default DateSelector
