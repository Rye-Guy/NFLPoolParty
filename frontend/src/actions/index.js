import axios from 'axios';
import {SIGN_IN, SIGN_OUT, SIGN_UP} from './types'

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
        url: 'http://localhost:8888/users/', 
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

  // fetchGames = () =>{
  //   axios.get('http://localhost:8888/games')
  //   .then((res)=>{
  //     this.setState({
  //       nflGames: res.data,
  //       isLoggedIn: false
  //     }) 
  //     console.log(res.data)
  //   })
  //   .catch((err)=>{console.log(err)})
  // }