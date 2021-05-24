import React, {useState} from "react"

// reactstrap components
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown
} from "reactstrap"

const DropCircleRadius = ({onChange}) => {

  const [text, setText] = useState("Elige un radio")

  const onClick = (event) => {
    const value = event.target.textContent
    setText(value)
    onChange(value)
  }
  
  return (
          <UncontrolledDropdown style = {{textAlign: "center"}}>
            <DropdownToggle
              caret
              className="btn-round btn-block mt-2"
              color="info"
            >
              {text}
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem
              onClick={onClick}
            >
              0.5 km
            </DropdownItem>
              <DropdownItem
                onClick={onClick}
              >
                1 km
              </DropdownItem>
              <DropdownItem
                onClick={onClick}
              >
                1.5 km
              </DropdownItem>
              <DropdownItem
                onClick={onClick}
              >
                2 km
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        )
}

export default DropCircleRadius
