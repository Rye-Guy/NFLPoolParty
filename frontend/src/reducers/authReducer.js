import {SIGN_IN, SIGN_OUT, SIGN_UP} from '../actions/types'



const INITIAL_STATE ={
    isSignedIn: false,
    hasToken: localStorage.hasOwnProperty('token'),
    userInfo: null,
    error: null,
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_IN:
            return {...state, isSignedIn: true, hasToken: localStorage.hasOwnProperty('token'), response: action.payload};
        case SIGN_OUT:
            return {...state, isSignedIn: false, hasToken: localStorage.hasOwnProperty('token'), userInfo: {}};
        case SIGN_UP:
            return {...state, isSignedIn: false, hasToken: localStorage.hasOwnProperty('token'), response: action.payload};
        default:
            return state
    }
};