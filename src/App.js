import React from 'react'
import './App.css'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Root } from './components'
import { BrowserRouter as Router } from 'react-router-dom'

const theme = createMuiTheme()

function App () {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Root />
      </Router>
    </MuiThemeProvider>
  )
}

export default App
