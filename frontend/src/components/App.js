import React, { Component } from 'react';
import Home from './Home';
import Navbar from './Navbar';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import {  BrowserRouter, Route } from 'react-router-dom';
import SignUpForm from './SignUpForm';

class App extends Component{ 
  render(){
    return (
      <>
        <BrowserRouter>
        <Navbar></Navbar>
         <div className='ui container'>
          <Route component={Home} path='/' exact></Route>
          <Route component={SignUpForm} path='/sign-up' exact></Route>
          <AuthenticatedRoutes></AuthenticatedRoutes>
        </div>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
