
import React from "react"
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

//Cache data in order to work offline
import * as serviceWorker from './serviceWorker'

import App from './App.jsx'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <StrictMode>
      <CssBaseline />
      <App />
    </StrictMode>
);

/*if (module.hot) {
module.hot.accept()
}*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
