import React from 'react'
import ReactDOM from 'react-dom'

import './firebase'
import './sentry'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './index.css'

console.log(process.env)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
serviceWorker.register()
