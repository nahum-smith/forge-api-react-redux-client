import React, {Component} from 'react'
import {FileInput} from '../../components'

class FileInputContainer extends Component {
  handleChange = (event) => {
    console.log('Selected file:', event.target.files[0])
  }
  render () {
    return (
      <div>
        <p>{'FileInputContainer'}</p>
        <form>
          <FileInput name="myImage"
                     accept=".png,.gif"
                     placeholder="My Image"
                     className="inputClass"
                     onChange={this.handleChange} />
        </form>
      </div>
    )
  }
}
export default FileInputContainer
