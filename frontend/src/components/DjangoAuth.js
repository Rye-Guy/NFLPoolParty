import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signOut } from '../actions';

class DjangoAuth extends Component{
    
    onSignOutClick = () =>{
        this.props.signOut();
    }
    
    renderAuthButton(){
        if(this.props.token){
            return <button onClick={()=>this.onSignOutClick()} className='ui red button'>Sign Out</button>
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) =>{
    return {
            token: state.authReducer.hasToken,
    }
}

export default connect(mapStateToProps, {signOut})(DjangoAuth)