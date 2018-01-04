const TESTING =                     'TESTING'
const BASIC_AUTH =                  'BASIC_AUTH'
const INITIAL_FILE_UPLOAD_SUCCESS = 'INITIAL_FILE_UPLOAD_SUCCESS'
const INITIAL_FILE_UPLOAD_FAILURE = 'INITIAL_FILE_UPLOAD_FAILURE'
const INITIAL_FILE_UPLOAD =         'INITIAL_FILE_UPLOAD'
const POST_FILE_TO_SERVER =         'SEND_FILE_TO_SERVER'
const POST_FILE_TO_SERVER_SUCCESS = 'SEND_FILE_TO_SERVER_SUCCESS'
const POST_FILE_TO_SERVER_FAILURE = 'SEND_FILE_TO_SERVER_FAILURE'
const SET_FILE_NAME =               'SET_FILE_NAME'


export function fileUpload () {
  return {
    type: INITIAL_FILE_UPLOAD,
  }
}
export function testingActionCreator () {
  return {
    type: TESTING
  }
}
export function authAction (bool) {
  return {
    type: BASIC_AUTH,
    auth: bool
  }
}
export function setFileName (fileName) {
  return {
    type: SET_FILE_NAME,
    fileName
  }
}
export function postFileToServer () {

}
export function postFileToServerSuccess (fileSize) {
  return {
    type: POST_FILE_TO_SERVER_SUCCESS,
    fileSize
  }
}
export function postFileToServerFailure (err) {
  return {
    type: POST_FILE_TO_SERVER_FAILURE,
    err
  }
}
export function readFileFromClient (file) {
  return function (dispatch, getState) {
    var reader = new FileReader();
    var printEventType = function(event) {
      console.log('got event: ' + event.type);
    };
    //----------------------------------------
    // Event Outlines
    //----------------------------------------
    //reader.onloadstart = printEventType;
    //reader.onprogress = printEventType;
    //reader.onload = printEventType
    reader.onloadend = (e) => {
      printEventType(e);
      var blob = new Blob([reader.result])
      var myHeaders = new Headers()
      var formdata = new FormData()
      formdata.append('file', blob)
      formdata.append('fileName', getState().application.fileName)
      var myInit = {
                method: 'POST',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default',
                body: formdata
        }

      fetch('http://localhost:9999/filePicker', myInit)
      .then(res => {
        console.log(res)
        if (res.status === 200 && res.ok) {
          res.json().then((data) => {
            console.log('Server Received file: '+ data.fileName )
            dispatch(postFileToServerSuccess(data.fileSize))
          })
        } else {
          var err = `${res.status}: Error Posting File`
          dispatch(postFileToServerFailure(err))
        }

      })
      .catch(err => dispatch(postFileToServerFailure(err)))
    }
    console.log('  starting read');
    reader.readAsArrayBuffer(file)
    console.log('leaving openFile()')
  }
}

const initialState = {
  isUploading: false,
  error: '',

}
export function application (state = initialState, action) {
  switch (action.type) {
    case TESTING:
      return {
        ...state,
        testing: true
      }
    case SET_FILE_NAME:
      return {
        ...state,
        fileName: action.fileName
      }
    case INITIAL_FILE_UPLOAD:
      return {
        ...state,
        isUploading: true
      }
    default:
      return state
  }
}
