import * as actionTypes from './actionTypes';

export const setMessage = (message) => {
    return {
        type: actionTypes.SET_MESSAGE,
        message: message
    }
}

export const clearMessage = () => {
    return {
        type: actionTypes.CLEAR_MESSAGE
    }
}