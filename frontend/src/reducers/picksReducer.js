import {SELECT_PICK, PATCH_USER_PICK, FETCH_USER_PROFILE} from '../actions/types'

const INITAL_STATE = {
    currentPick: null,
    userProfile: null
}

export default (state = INITAL_STATE, action)=>{
    switch(action.type){
        case SELECT_PICK:
            return {...state, currentPick: action.payload};
        case PATCH_USER_PICK:
            return {...state, currentPick: null}
        case FETCH_USER_PROFILE:
            return {...state, userProfile: action.payload}
        default:
            return state
    }
}