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
        }else{
            return null
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) =>{
    return {
            isSignedIn: state.authReducer.isSignedIn,
            token: state.authReducer.hasToken,
            resData: state.authReducer.resData
    }
}

export default connect(mapStateToProps, {signOut})(DjangoAuth)