import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './HeaderContainer.css'


class HeaderContainer extends Component {

  render () {
    return (
      <header className='App-header'>
        <h1 className='App-title'>React / Redux / ForgeAPI File Explorer</h1>
      </header>
    )
  }
}
function mapStateToProps({application}) {
  return {
    isAuth: application.isAuth
  }
}

HeaderContainer = connect(mapStateToProps)(HeaderContainer)

export default HeaderContainer
