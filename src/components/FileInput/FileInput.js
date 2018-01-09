import React, {Component} from 'react'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActionCreators from '../../redux/modules/application'

class FileInput extends Component {

  state = {
    fileName: '',
    file: '',
    fileSize: ''
  }

  setFileState = (data) => {
    this.setState({
      ...this.state,
      fileName: data.fileName,
      file: data.file,
      fileSize: data.file.size
    })
  }

  handleChange = async (event) => {
    var inputFile = event.target.files[0];
    this.props.setFile(inputFile)
    this.props.handleInputFile()
  }

  render() {
    console.log(this.props)
    var {fileName, isPosting, isUploading, file} = this.props
    return (
      <div>
        <input
          id="myInput"
          name='fileInput'
          type="file"
          accept='.dwg, .pdf, .rvt, .txt'
          onChange={this.handleChange}/>
      </div>
    );
  }
}

function mapStateToProps({application}) {
  var { isUploading, isPosting, file } = application
  return {
    isUploading,
    isPosting,
    file
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInput)
