import React from 'react'
import { Box, CircularProgress } from '@mui/material'

const CenteredLoadingSpinner = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default CenteredLoadingSpinner
