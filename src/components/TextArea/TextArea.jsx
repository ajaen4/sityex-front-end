import React from 'react'
import TextField from '@mui/material/TextField'
import FormHelperText from '@mui/material/FormHelperText'

const TextArea = ({name, register, errors}) => {

  return (
    <>
      <TextField
        {...register(name, {
          required: true,
          maxLength: 300,
          pattern: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð !¡?¿:,.()'-]+$/u
        })}
        style={{
          fontSize: 'large'
        }}
        variant="outlined"
        id={name}
        name={name}
        rows={5}
        fullWidth
        multiline
        error={errors[name] !== undefined}
      />
      {errors[name] && errors[name].type === 'required' &&
        <FormHelperText error>You must introduce at least one advice</FormHelperText>
      }
      {errors[name] && errors[name].type === 'maxLength' &&
        <FormHelperText error>{'El ' + name + ' puede tener como maximo 300 caracteres'}</FormHelperText>
      }
      {errors[name] && errors[name].type === 'pattern' &&
        <FormHelperText error>Existen caracteres no permitidos</FormHelperText>
      }
    </>
  )
}

export default TextArea
