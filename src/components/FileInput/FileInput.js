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
    var file = event.target.files[0];
    this.props.setFileName(file.name)
    this.props.readFileFromClient(file)
  }
  render() {
    var {fileName, fileSize} = this.state
    return (
      <div>
        {!fileName
          ? <input
              id="myInput"
              name='file'
              type="file"
              accept='.dwg, .pdf'
              ref={(ref) => this.fileUpload = ref}
              onChange={this.handleChange}/>
          : <div>
              <h2>{'File Upload Successful'}</h2>
              <h4>{`FileName: ${fileName}`}</h4>
              <h4>{`Size: ${fileSize}`}</h4>
            </div>
        }
        {this.state.filePath !== '' ? <p>{this.state.filePath}</p> : null}
      </div>
    );
  }
}

function mapStateToProps({application}) {
  return {
    application
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInput)
