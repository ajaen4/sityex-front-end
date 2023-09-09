import React, { useState } from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"

const DropCircleRadius = ({ onChange }) => {
  const [text, setText] = useState("Elige un radio")
  const [anchorEl, setAnchorEl] = useState(null)

  const onClick = (event) => {
    const value = event.target.textContent
    setText(value)
    onChange(value)
    handleClose()
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Button color="info" onClick={handleClick} variant="contained" style={{ marginTop: "8px" }}>
        {text}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={onClick}>0.5 km</MenuItem>
        <MenuItem onClick={onClick}>1 km</MenuItem>
        <MenuItem onClick={onClick}>1.5 km</MenuItem>
        <MenuItem onClick={onClick}>2 km</MenuItem>
      </Menu>
    </div>
  )
}

export default DropCircleRadius
