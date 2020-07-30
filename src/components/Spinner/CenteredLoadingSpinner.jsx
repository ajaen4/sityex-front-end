
import React from 'react'

import './Spinner.css'

const CenteredLoadingSpinner = () => {

  return <div className = "spinner-container">
          <div className = "lds-ripple">
            <div></div>
            <div></div>
          </div>
         </div>
}

export default CenteredLoadingSpinner
