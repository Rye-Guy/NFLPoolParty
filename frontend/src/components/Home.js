import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInForms from './SignInForms'
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
                <SignInForms></SignInForms>
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
  
  