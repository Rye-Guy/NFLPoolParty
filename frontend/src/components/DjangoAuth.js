import React, {Component} from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class DjangoAuth extends Component{
    
    onSignInClick = () =>{
        console.log('something')
        const formData = {username: 'admin', password: 'xultophy99'}
        this.props.signIn(formData)
    }

    onSignOutClick = () =>{
        this.props.signOut();
    }
    
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
        }else if(this.props.isSignedIn){
            return <button onClick={()=>this.onSignOutClick()} className='ui red button'>Sign Out</button>
        }else{
            return <button onClick={()=>this.onSignInClick()} className='ui green button'>Sign In</button>
        }
    }

    render(){
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) =>{
    return {isSignedIn: state.authReducer.isSignedIn}
}

export default connect(mapStateToProps, {signIn, signOut})(DjangoAuth)