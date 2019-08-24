import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignInForms from './SignInForms'
class Home extends Component{

    componentDidMount = () =>{
        console.log(console.log(this.props))
    }

    displayGamesOrSignIn = () =>{
        if(this.props.isSignedIn){
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
                <h1>Welcome</h1>
                {this.displayGamesOrSignIn()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
      isSignedIn: state.authReducer.isSignedIn,
      user: state.authReducer.userInfo
    }
}

export default connect(mapStateToProps, )(Home)
  
  