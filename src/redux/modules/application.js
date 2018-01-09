const INITIAL_FILE_UPLOAD_SUCCESS = 'INITIAL_FILE_UPLOAD_SUCCESS'
const INITIAL_FILE_UPLOAD_FAILURE = 'INITIAL_FILE_UPLOAD_FAILURE'
const INITIAL_FILE_UPLOAD =         'INITIAL_FILE_UPLOAD'
const POST_FILE_TO_SERVER =         'POST_FILE_TO_SERVER'
const POST_FILE_TO_SERVER_SUCCESS = 'POST_FILE_TO_SERVER_SUCCESS'
const POST_FILE_TO_SERVER_FAILURE = 'POST_FILE_TO_SERVER_FAILURE'
const SET_FILE_NAME =               'SET_FILE_NAME'
const SET_FILE =                    'SET_FILE'
const FORGE_INITIATED =             'FORGE_INITIATED'
const SET_CREDENTIALS =             'SET_CREDENTIALS'
const TRANSLATE_REQUEST =           'TRANSLATE_REQUEST'



export function fileUpload () {
  return {
    type: INITIAL_FILE_UPLOAD,
  }
}
export function postFileToServer () {
  return {
    type: POST_FILE_TO_SERVER
  }
}
export function postFileToServerSuccess (forgeResponse) {
  return {
    type: POST_FILE_TO_SERVER_SUCCESS,
    forgeResponse
  }
}
export function postFileToServerFailure (err) {
  return {
    type: POST_FILE_TO_SERVER_FAILURE,
    err
  }
}
export function setFile (file) {
  return {
    type: SET_FILE,
    file
  }
}
function translateRequest () {
  return {
    type: TRANSLATE_REQUEST
  }
}
export function handleInputFile () {
  return function (dispatch, getState) {
    var file = getState().application.file
    var reader = new FileReader();
    console.log('starting read');
    reader.readAsArrayBuffer(file)
    console.log('leaving openFile()')

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
      console.log(blob)
      dispatch(postFileToServer())
      sendFileToServer(blob, file.name, getState().application.clientID, getState().application.clientSecret)
        .then(res => {
          console.log(res)
          if (res.ok) {
            console.log(res.message)
            console.log(res.forgeResponse)
            return dispatch(postFileToServerSuccess(res.forgeResponse))
          } else {
            console.log(res.message)
            return dispatch(postFileToServerFailure(res.message))
          }
        })
        .catch(err => {
          console.log(err)
          return dispatch(postFileToServerFailure('error'))
        })
    }
  }
}
async function sendTranslateRequestToServer() {
  var myHeaders = new Headers()
  var formdata = new FormData()
  formdata.append('joe', 'mama')
  // formdata.append('urn', postURN)
  // formdata.append('clientID', getState().application.clientID)
  // formdata.append('clientSecret', getState().application.clientSecret)
  var myInit = {
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body: formdata
    }
var url = 'http://localhost:3300/testing/translate'
console.log(formdata)
var fetchResponse = await fetch(url, myInit)
        .then(res => {
          console.log(res)
          if (res.status === 200 && res.ok) {
              var response = {
                ok: true
              }
              return response
          } else {
            return Promise.reject(new Error('ERROR: ' + res.message));
          }
        })
      .catch(err => {
        Promise.reject(new Error(err.message))
      })
console.log(fetchResponse)
}
export const initiateTranslateRequest = (urn) => {
  return function (dispatch, getState,) {
    dispatch(translateRequest())
    sendTranslateRequestToServer()

  }
}
export const sendFileToServer = (file, fileName, clientID, clientSecret) => {
    var myHeaders = new Headers()
    var formdata = new FormData()
    formdata.append('file', file)
    formdata.append('fileName', fileName)
    formdata.append('clientID', clientID)
    formdata.append('clientSecret', clientSecret)
    var myInit = {
              method: 'POST',
              headers: myHeaders,
              mode: 'cors',
              cache: 'default',
              body: formdata
      }
    var url = 'http://localhost:3300/testing/filePicker'
    return fetch(url, myInit)
          .then(res => {
            console.log(res)
            if (res.status === 200 && res.ok) {
              return res.json().then((data) => {
                var response = {
                  message: 'Server Received file: '+ JSON.stringify(data.inputFile),
                  forgeResponse: data.forgeResponse.body,
                  ok: true
                }
                return response
              })
            } else {
              return Promise.reject(new Error('ERROR: ' + res.message));
            }
          })
        .catch(err => {
          Promise.reject(new Error(err.message))
        })
}
export function setCredentials (clientID, clientSecret) {
  return {
    type: SET_CREDENTIALS,
    clientID,
    clientSecret
  }
}
const initialState = {
  isUploading: false,
  isPosting: false,
  credsOpen: false,
  clientID: '',
  clientSecret: '',
  error: '',
  file: {},
  forgeFiles: {}
}
export function application (state = initialState, action) {
  switch (action.type) {
    case SET_FILE:
      return {
        ...state,
        file: action.file
      }
    case TRANSLATE_REQUEST:
    return {
      ...state,
      isTranslating: true
    }
    case POST_FILE_TO_SERVER:
      return {
        ...state,
        isPosting: true
      }
    case POST_FILE_TO_SERVER_SUCCESS:
      return {
        ...state,
        isPosting: false,
        forgeFiles: {
          ...state.forgeFiles,
          [action.forgeResponse.objectKey]: action.forgeResponse
        }
      }
    case POST_FILE_TO_SERVER_FAILURE:
      return {
        ...state,
        isPosting: false,
        err: action.err
      }
    case SET_CREDENTIALS:
      return {
        ...state,
        clientID: action.clientID,
        clientSecret: action.clientSecret
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
