import React, {Component} from 'react'
import {CredsInput} from '../../components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/modules'
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'
import {FacebookAuthButton} from '../../components'

const styles = theme => ({
  container: {
    display: 'flex',
    width: 275
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 275,
  }
})


class CredsInputContainer extends Component {

  render () {
    const {classes, open} = this.props
    return (
      <div className={classes.container}>
        <Dialog open={open} maxWidth='xs'>
          <DialogTitle>{'Input Forge Credentials'}</DialogTitle>
          <DialogContent>
            <CredsInput />
          </DialogContent>
        </Dialog>
    </div>
    )
  }
}
const mapStateToProps = ({application}) => {
  return {
    open: !application.clientID || !application.clientSecret
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CredsInputContainer))
