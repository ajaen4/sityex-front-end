import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControl from '@mui/material/FormControl'
import Container from '@mui/material/Container'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import { Controller } from 'react-hook-form'


const Opinion5 = ({fieldName, labelName, errorName, control, errors}) => {

  const style = {marginRight: '0.5em', marginLeft: '0px', padding: '0px'}

  return (
    <Container style={{
      marginTop: '30px',
      marginRight: '0px',
      marginLeft: '0px',
      paddingLeft: '0px',
      paddingRight: '0px'
    }}>
      <div>
        <h5 style={{
          marginBottom: '0px'
        }}>{labelName}</h5>
      </div>
      <Grid container justifyContent="center" style={{marginLeft: '0px', marginRight: '0px'}}>
        <FormControl component="fieldset" style={style}>
        <Controller
            name={fieldName}
            control={control}
            defaultValue="1"
            render={({ field }) => (
              <RadioGroup {...field} row>
                {['1', '2', '3', '4', '5'].map((value, index) => (
                  <FormControlLabel
                    key={index}
                    value={value}
                    control={<Radio />}
                    label={value}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
      </Grid>

      {errors[fieldName] && errors[fieldName].type === 'required' &&
        <FormHelperText error>
          {'Se debe introducir la opinion sobre ' + (errorName === undefined ? labelName : errorName)}
        </FormHelperText>
      }
    </Container>
  )
}

export default Opinion5
