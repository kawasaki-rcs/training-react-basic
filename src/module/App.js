import { 
    SET_MAIN_ERROR,
} from './actionTypes';

//-- Action Creaters

export const setMainError = ({ errorOpen=true, errorMessage="" }) => {
    return {
        type: SET_MAIN_ERROR,
        errorOpen,
        errorMessage,
    }
}

//-- Reducer

const defaultState = {
    errorOpen: false,
    errorMessage: "",
}

export const App = (state=defaultState, action) => {
    switch( action.type ) {
        case SET_MAIN_ERROR:
            return Object.assign({}, state, {
                errorOpen: action.errorOpen,
                errorMessage: action.errorMessage,
            })
        default:
            return state
    }
}
