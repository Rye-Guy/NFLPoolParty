
import React, { Component } from 'react';
import DjangoAuth from './DjangoAuth';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component{

    renderNav = () => {
        if(this.props.token){
            return(
                <div className="ui secondary pointing menu">
                    <Link to="/" className="item">Home</Link>
                    <Link to="/picks" className="item">Picks</Link>
                    <Link to="/user-profile" className="item">User Profile</Link>
                    {/* <a href="/" className="item">Standings</a> */}
                    <div className="right menu">
                        <DjangoAuth></DjangoAuth>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="ui secondary pointing menu">
                    <Link to="/" className="item">Login</Link>
                    <Link to="/sign-up"  className="item">Sign Up</Link>
                    <div className="right menu">
                        <DjangoAuth></DjangoAuth>
                    </div>
                </div>
            )
        }
    }
    render(){
        return(
            <div>
                {this.renderNav(this.props.isSignedIn)}
            </div>
        );   
    }
}

const mapStateToProps = (state)=>{
    return {
        token: state.authReducer.hasToken
    }
}

export default connect(mapStateToProps, )(Navbar)