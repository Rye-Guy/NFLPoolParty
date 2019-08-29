import React, { Component } from 'react';
import Home from './Home';
import Navbar from './Navbar';
import AuthenticatedRoutes from './AuthenticatedRoutes';
import {  BrowserRouter, Route } from 'react-router-dom';

class App extends Component{ 
  render(){
    return (
      <div>
        <BrowserRouter>
        <Navbar></Navbar>
         <div className='ui container'>
          <Route component={Home} path='/' exact></Route>
          <AuthenticatedRoutes></AuthenticatedRoutes>
        </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
