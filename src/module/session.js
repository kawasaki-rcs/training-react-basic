import { 
    SESSION_CHECK,
    REQ_PUSH,
} from './actionTypes'

import { LOCATION_CHANGE } from 'react-router-redux'

/**
 * セッション途切れの検出用（PWA時のバックグラウンド処理等）
 * redux-persist の管理外を明示するために隔離
*/

export const reqPush = (nextPath) => {
    return {
        type: REQ_PUSH,
        payload: nextPath,
    }
}

export const sessionCheck = (nextPath) => {
    return {
        type: SESSION_CHECK,
        payload: nextPath,
    }
}

export const defaultState = { 
    enableSession: false,
}

export default function Session (state=defaultState, action) {
  switch (action.type) {
    case SESSION_CHECK:
        return Object.assign({}, state, {
            enableSession: true,
        })
    case LOCATION_CHANGE:
        return Object.assign({}, state, {
            location: action.payload,
        })
    default:
      return state
  }
}