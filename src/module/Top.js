import { authFetch } from './common'
import { REQUEST_ATTEND, RESPONSE_ATTEND } from './actionTypes';

//-- Action Creaters

export const reqAttend = (payload) => {
    return {
        type: REQUEST_ATTEND,
        payload,
    }
}

export const fetchAttend = (data) => {
    return authFetch(`/attend`, data)
}

export const resAttend = (payload) => {
    return {
        type: RESPONSE_ATTEND,
        payload,
    }
}

//-- Reducer

const defaultState = {
    isReqAttend: false
}

export const Top = (state=defaultState, action) => {
    switch( action.type ) {
        case REQUEST_ATTEND:
            return Object.assign({}, state, {
                isReqAttend: true,
            })
         case RESPONSE_ATTEND:
            return Object.assign({}, state, {
                isReqAttend: false,
            })
        default:
            return state
    }
}
