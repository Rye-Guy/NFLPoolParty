import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import gamesReducer from './gamesReducer';

export default combineReducers ({
    authReducer: authReducer,
    form: formReducer,
    gamesReducer: gamesReducer
});