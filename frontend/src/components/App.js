import React, { Component } from 'react';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      nflGames: []
    }
  }

  componentDidMount(){
    console.log('mounted')
    this.fetchGames();
  }

  fetchGames = () =>{
    axios.get('http://localhost:8888/games')
    .then((res)=>{
      this.setState({nflGames: res.data}) 
      console.log(res.data)
    })
    .catch((err)=>{console.log(err)})
  }
  render(){
    return (
      <div>
        <p>Hello World</p>
      </div>
    )
  }
}

export default App;
