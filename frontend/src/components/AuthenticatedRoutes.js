import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import UserPicks from './UserPicks';
import UserProfile from './UserProfile';

class AuthenticatedRoutes extends Component{

    renderRoutesOrRedirect(){
        if(this.props.token){
            return(
                <div>
                    <Route component={UserPicks} path='/picks' exact></Route>
                    <Route component={UserProfile} path='/user-profile' exact></Route>
                </div>
            )
        }else{
            return(
                <Redirect to="/"></Redirect>
            )
        }
    }

    render(){
        return(
            <div>
                {this.renderRoutesOrRedirect()}
            </div>
        )
    }
}

const mapStateToProps = (state)=>{

    return{
        token: state.authReducer.hasToken
    }
}

export default connect(mapStateToProps, )(AuthenticatedRoutes)