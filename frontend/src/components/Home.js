import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInForms from './SignInForms'

class Home extends Component{
    
    displayGamesOrSignIn = () =>{
        if(this.props.token){
            return (
                <div>
                    <h2>This weeks games</h2>
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
      user: state.authReducer.userInfo
    }
}

export default connect(mapStateToProps, )(Home)
  
  