import React, {Component} from 'react'
import {FileInput} from '../../components'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    marginTop: '20px'
  }
})
class FileInputContainer extends Component {
  handleChange = (event) => {
    console.log('Selected file:', event.target.files[0])
  }
  render () {
    var { classes } = this.props
    return (
      <div className={classes.root}>
          <FileInput />
      </div>
    )
  }
}
export default withStyles(styles)(FileInputContainer)
