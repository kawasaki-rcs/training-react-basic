import { 
    FETCH_TIMEOUT, 
    FETCH_ERROR, 
    SET_MAIN_ERROR, 
    SET_PERSIST_PATH,
} from '../module/actionTypes'


//-- Action Creaters


export const setMainError = ({ errorMessage="", errorOpen=true }) => {
    if ( errorMessage === "" ) errorOpen = false

    return {
        type: SET_MAIN_ERROR,
        errorMessage,
        errorOpen,
    }
}


export const setPersistPath = (nextPath) => {
    return {
        type: SET_PERSIST_PATH,
        payload: nextPath,
    }
}


//-- Reducer

export const defaultState = {
    //validToken: true,
    //authError: "",
    persistPath: "",
    timeoutError: false,
    errorOpen: false,
    errorMessage: "",
}

export default function others (state=defaultState, action) {
  switch (action.type) {
      /*
    case VALID_TOKEN:
        return Object.assign({}, state, {
            validToken: true,
        })
    case INVALID_TOKEN:
        return Object.assign({}, state, {
            validToken: false,
            authError: action.error,
        })
        */
    case FETCH_TIMEOUT:
        return Object.assign({}, state, {
            snackbarOpen: true,
            snackbarMessage: "タイムアウト",
        })
    case FETCH_ERROR:
        return Object.assign({}, state, {
            snackbarOpen: true,
            snackbarMessage: "通信エラー",
        })
    case SET_PERSIST_PATH:
        return Object.assign({}, state, {
            persistPath: action.payload,
        })
    case SET_MAIN_ERROR:
        return Object.assign({}, state, {
            errorOpen: action.errorOpen,
            errorMessage: action.errorMessage,
        })
    default:
      return state
  }
}