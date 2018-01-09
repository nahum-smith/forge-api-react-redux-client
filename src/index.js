import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import configureStore from './redux/configureStore'
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker'

const configuredStore = configureStore(true)

ReactDOM.render(
  <Provider store={ configuredStore }>
    <App />
  </Provider>, document.getElementById('root'))
registerServiceWorker()
