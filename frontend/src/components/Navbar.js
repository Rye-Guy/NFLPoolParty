
import React, { Component } from 'react';
import DjangoAuth from './DjangoAuth';

class Navbar extends Component{

    renderNav = (isSignedIn = false) => {
        if(isSignedIn){
            return(
                <div className="ui secondary pointing menu">
                    <a href="/" className="item">Home</a>
                    <a href="/" className="item">Picks</a>
                    <a href="/" className="item">All Games</a>
                    <a href="/" className="item">Standings</a>
                    <div className="right menu">
                        <a href="/" className="item">
                            Logout
                        </a>
                    </div>
                </div>
            )
        }else{
            return(
                <div className="ui secondary pointing menu">
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
                {this.renderNav()}
            </div>
        );   
    }
}

export default Navbar;