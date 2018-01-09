import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import purple from 'material-ui/colors/purple';
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as appActionCreators from '../../redux/modules/application'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
  textFieldRoot: {
    marginLeft: '10px',
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
    marginBottom: '5px'
  },
  textFieldInput: {
    borderRadius: 4,
    background: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  button: {
    marginTop: '20px',
    marginLeft: '10px',
    width: '100%'
  },
  textFieldFormLabel: {
    marginLeft: '10px',
    fontSize: 18,
  },
  formHelper: {
    marginLeft: '10px'
  }
});

class CredsInput extends Component {
  state = {
    clientID: '',
    clientSecret: '',
    open: true
  }
  onChange = (event) => {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    })
  }
  submitCredentials = () => {
    var {clientID, clientSecret} = this.state
    this.props.setCredentials(clientID, clientSecret)
  }
  render () {
    const { classes, submitCredentials } = this.props;

    return (
      <div className={classes.container}>
        <TextField
          value={this.state.clientID}
          onChange={this.onChange}
          label="Client ID"
          id='clientID'
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput,
            },
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.textFieldFormLabel,
          }}
          FormHelperTextProps={{
            className: classes.formHelper
          }}
        />
        <TextField
          value={this.state.clientSecret}
          onChange={this.onChange}
          label="Client Secret"
          id='clientSecret'
          InputProps={{
            disableUnderline: true,
            classes: {
              root: classes.textFieldRoot,
              input: classes.textFieldInput,
            },
          }}
          InputLabelProps={{
            shrink: true,
            className: classes.textFieldFormLabel,
          }}
          FormHelperTextProps={{
            className: classes.formHelper
          }}
        />
        <div style={{width: 'inherit'}}>
          <Button
            classes={{root: classes.button}}
            onClick={this.submitCredentials}
            raised
          >{'Set Credentials'}</Button>
        </div>
      </div>
    )
  }

}

CredsInput.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({application}) {
  return{application}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(appActionCreators,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CredsInput));
