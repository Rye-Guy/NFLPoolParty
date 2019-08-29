import axios from 'axios';
import {SIGN_IN, SIGN_OUT, SIGN_UP, FETCH_GAMES, SELECT_PICK, PATCH_USER_PICK, FETCH_USER_PROFILE} from './types'

export const signIn = (formData) => async (dispatch) => {
    const response = await axios({
        method: 'post',
        url: 'http://localhost:8888/token-auth/',
        data: {
            "username": formData.username,
            "password": formData.password
        },})
        .then((res)=>{
            localStorage.setItem('token', res.data.token);
            return res.data
        }).catch((err)=>{
            return err.response
        })

    dispatch({
        type: SIGN_IN,
        payload: response
    })
}

export const signUp = (formData) => async (dispatch) =>{
    const response = await axios({
        method: 'post',
        url: 'http://localhost:8888/nfl/users/', 
        data: {
            "username": formData.createusername,
            "password": formData.createpassword,
        },})
        .then((res)=>{
            localStorage.setItem('token', res.data.token);
            return res.data
        }).catch((err)=>{
            return err.response
        })

    dispatch({
        type: SIGN_UP,
        payload: response
    })
}

export const signOut = () => {
    localStorage.removeItem('token');
    return {
        type: SIGN_OUT
    }
}

export const fetchGames = () => async (dispatch) =>{
    const response = await axios({
        method: 'get',
        url: `http://localhost:8888/nfl/games/1`,
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        },
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
        return err.response
    })

    dispatch({
        type: FETCH_GAMES,
        payload: response
    })
}

export const selectPick = (gameObj, selectedTeamObj, losingTeamObj) => {
    return {
        type: SELECT_PICK,
        payload: [gameObj, selectedTeamObj, losingTeamObj]
    }
}

export const patchUserPick = (gameId, teamId) => async (dispatch) => {
    const response = await axios({
        method: 'PATCH',
        url: `http://localhost:8888/nfl/current-user-picks/`,
        data: {
            game: gameId,
            team: teamId
        },
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        },
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
        return err.response
    })

    dispatch({
        type: PATCH_USER_PICK,
        payload: response
    })
}

export const fetchUserProfile = () => async (dispatch) =>{
    const response = await axios({
        method: 'GET',
        url: `http://localhost:8888/nfl/current-user-picks/`,
        headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
        }
    }).then((res)=>{
        return res.data
    }).catch((err)=>{
        return err.response
    })

    dispatch({
        type: FETCH_USER_PROFILE,
        payload: response
    })
}