import React, { Component } from 'react';
import Home from './Home';
import Navbar from './Navbar';

class App extends Component{ 
  componentDidUpdate(){
    console.log(this.props)
  }


  render(){
    return (
      <div>
        <Navbar></Navbar>
         <div className='ui container'>
          <Home></Home>
        </div>
      </div>
    )
  }
}


export default App;
