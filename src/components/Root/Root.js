import React, { Component } from 'react'
import './Root.css'
import { withStyles } from 'material-ui/styles'
import { Route } from 'react-router-dom'
import Button from 'material-ui/Button'
import { HeaderContainer, MainContainer } from '../../containers'

class Root extends Component {
  render () {
    return (
      <div className='App'>
        <HeaderContainer />
        <Route path='/' exact component={MainContainer} />
      </div>
    )
  }
}

export default Root
