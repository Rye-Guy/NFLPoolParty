import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInForm from './SignInForm';
import CurrentGames from './CurrentGames';
class Home extends Component{
    
    displayGamesOrSignIn = () =>{
        if(this.props.token){
            return (
                <div>
                    <CurrentGames></CurrentGames>
                </div>
            )
        }else{
            return(
                <SignInForm></SignInForm>
            )
        }
    }
    render(){
        return(
            <div>
                {this.displayGamesOrSignIn()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      token: state.authReducer.hasToken,
    }
}

export default connect(mapStateToProps, )(Home)
  
  