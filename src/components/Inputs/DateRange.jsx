import React , { useState }from "react"

import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'

// reactstrap components
import {
  Container
} from "reactstrap"


const DateRange = ({label, onChangeDates}) => {

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [focus, setFocus] = useState(null)

  const onDatesChange = ({startDate, endDate}) => {
    setStartDate(startDate)
    setEndDate(endDate)
    onChangeDates(startDate, endDate)
  }

  return (
    <Container>
      <div style = {{fontSize: "medium", marginBottom: "8px"}}>{label}</div>
        <DateRangePicker
          startDate = {startDate}
          startDateId = "start_date"
          endDate = {endDate}
          endDateId = "end_date"
          onDatesChange = {onDatesChange}
          focusedInput = {focus}
          onFocusChange = {focusedInput => setFocus(focusedInput)}
        />
    </Container>
  )
}

export default DateRange
