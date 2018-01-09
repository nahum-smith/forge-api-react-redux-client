import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { FileInputContainer, CredsInputContainer, ForgeFilesContainer } from '../../containers'


class MainContainer extends Component {
  handleGetFormats: (e) => {

  }
  render () {
    return (
      <div>
        <FileInputContainer />
        <ForgeFilesContainer />
        <CredsInputContainer />
      </div>
    )
  }
}

export default MainContainer
