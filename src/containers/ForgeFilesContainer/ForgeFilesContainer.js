import React, {Component} from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../redux/modules/application'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper';
import {translateRequest} from '../../redux/modules/application'
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class ForgeFilesContainer extends Component {
  handleDelete = (objectID, objectKey) => {
    console.log(objectID)
  }
  handleTranslate = (objectID) => {
    console.log(objectID)
    this.props.postTranslateRequest(objectID)
  }
  handleExtract = (objectID) => {
    console.log(objectID)
  }
  render() {
    var { forgeFiles, classes, translateRequest } = this.props
    console.log(translateRequest)
    var fileIDs = Object.keys(forgeFiles)
    var filesPresent = fileIDs.length !== 0
    return (
      <div>
        <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>File</TableCell>
              <TableCell>Bucket Key</TableCell>
              <TableCell>Object ID</TableCell>
              <TableCell>sha1</TableCell>
              <TableCell numeric>size</TableCell>
              <TableCell>Location</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileIDs.map((n, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{forgeFiles[n].objectKey}</TableCell>
                  <TableCell>{forgeFiles[n].bucketKey}</TableCell>
                  <TableCell>{forgeFiles[n].objectId}</TableCell>
                  <TableCell>{forgeFiles[n].sha1}</TableCell>
                  <TableCell numeric>{forgeFiles[n].size}</TableCell>
                  <TableCell>{forgeFiles[n].location}</TableCell>
                  <TableCell><Button onClick={() => this.handleDelete(forgeFiles[n].objectId)} raised color='accent'>DELETE</Button></TableCell>
                  <TableCell><Button onClick={() => this.handleTranslate(forgeFiles[n].objectId)} raised color='primary'>Translate</Button></TableCell>
                  <TableCell><Button onClick={() => this.handleExtract(forgeFiles[n].objectId)} raised color='primary'>Extract</Button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
  }
}

function mapStateToProps({application}) {
  return{
    forgeFiles: application.forgeFiles
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators( actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ForgeFilesContainer))
