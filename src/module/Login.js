import { authFetch } from './common'
import { 
   REQUEST_LOGIN, 
   SUCCESS_LOGIN,
   FAILURE_LOGIN,
} from './actionTypes';

//-- Action Creaters

export const reqLogin = ({ username, password }) => {
    //let usernameDN = `${username}@${process.env.REACT_APP_DN_BASE}`
    return {
        type: REQUEST_LOGIN,
        payload: { username, password },
        username: username,
    }
}

export const fetchLogin = (data) => {
    return authFetch(`/authenticate`, data)
}

export const successLogin = ({ token, username }) => {
    localStorage.setItem("token", token)
    return {
        type: SUCCESS_LOGIN,
        username,
    }
}

export const failureLogin = (error) => {
    return {
        type: FAILURE_LOGIN,
    }
}

//-- Reducer

const defaultState = {
    isReqLogin: false,
    username: "",
}

export const Login = (state=defaultState, action) => {
    switch( action.type ) {
        case REQUEST_LOGIN:
            return Object.assign({}, state, {
                isReqLogin: true,
            })
        case SUCCESS_LOGIN:
            return Object.assign({}, state, {
                isReqLogin: false,
                username: action.username,
            })
        case FAILURE_LOGIN:
            return Object.assign({}, state, {
                isReqLogin: false,
            })
        default:
            return state
    }
}
