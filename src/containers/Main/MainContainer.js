import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { FileInputContainer } from '../../containers'


class MainContainer extends Component {
  render () {
    return (
      <div>
        <FileInputContainer />
      </div>
    )
  }
}

export default MainContainer
