import { authFetch } from './common'
import { 
   REQUEST_LOGIN, 
   SUCCESS_LOGIN,
   FAILURE_LOGIN,
} from './actionTypes';

//-- Action Creaters

export const reqLogin = ({ username, password }) => {
    return {
        type: REQUEST_LOGIN,
        payload: { username, password },
    }
}

export const fetchLogin = (data) => {
    return authFetch(`/authenticate`, data)
}

export const successLogin = ({ token }) => {
    localStorage.setItem("token", token)
    return {
        type: SUCCESS_LOGIN,
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
            })
        case FAILURE_LOGIN:
            return Object.assign({}, state, {
                isReqLogin: false,
            })
        default:
            return state
    }
}
