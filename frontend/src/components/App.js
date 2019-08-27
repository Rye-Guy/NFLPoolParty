import React, { Component } from 'react';
import Home from './Home';
import Navbar from './Navbar';
import UserPicks from './UserPicks';
import {  BrowserRouter, Route } from 'react-router-dom'

class App extends Component{ 
  render(){
    return (
      <div>
        <BrowserRouter>
        <Navbar></Navbar>
         <div className='ui container'>
          <Route component={Home} path='/' exact></Route>
          <Route component={UserPicks} path='/picks' exact></Route>
        </div>
        </BrowserRouter>
      </div>
    )
  }
}


export default App;
