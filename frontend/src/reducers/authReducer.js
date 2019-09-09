import {SIGN_IN, SIGN_OUT, SIGN_UP} from '../actions/types'



const INITIAL_STATE ={
    hasToken: localStorage.clear(),
    userInfo: null,
    error: null,
}

export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case SIGN_IN:
            return {...state, hasToken: localStorage.hasOwnProperty('token'), response: action.payload};
        case SIGN_OUT:
            return {...state, hasToken: localStorage.hasOwnProperty('token'), response: null};
        case SIGN_UP:
            return {...state, hasToken: localStorage.hasOwnProperty('token'), response: action.payload};
        default:
            return state
    };
};