import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from '../actions';
import {Redirect} from 'react-router-dom';

class SignUpForm extends Component{
    
    sendErrorMessage = (touched, errorMessage)=>{
        if(touched && errorMessage){
            return (
                <div style={{'display':'block'}} className='ui error message'>
                    <div className='header'>{errorMessage}</div>
                </div>
            )
        }
    }
    
    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`
        return(
            
            <div className={className}>
                <label htmlFor={formProps.input.name}>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete='off' />
                {this.sendErrorMessage(formProps.meta.touched, formProps.meta.error)}
            </div>    
        )
    }

    renderSignUpError = () =>{
        if(this.props.response){
            return (
                <div style={{'display':'block'}} className='ui error message'>
                    <div className='header'>We could not create your user! (Sorry)</div>
                    <div className='content'>There is probably a user with this username already</div>
                </div>
            )
        } 
    }

    comparePasswords = ({password, confirmpassword}) =>{
        console.log(password, confirmpassword)
    }

    onSubmit = (formData) => {
        this.props.signUp(formData)
    }

    renderSignUpOrRedirect = () => {
        if(this.props.token){
           return <Redirect to='/'></Redirect>
        }else{
            return(
            <div className="column">
                        <h2>Sign Up</h2>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
                            <Field name='username' type='text' component={this.renderInput} label='Enter Username'></Field>
                            <Field name='password' type="password" component={this.renderInput} label='Enter Password'></Field>
                            <Field name='confirmpassword' type="password" component={this.renderInput} label='Confirm password'></Field>
                            <button className='ui button primary'>Submit</button>
                        </form>
                        {this.renderSignUpError()}
            </div>
            )
        }

    }


    render(){
        return <div className="ui equal width grid">
            {this.renderSignUpOrRedirect()}
        </div>
    }
}

const validate = (formData) => {
    const error = {

    }
    if(formData.username || formData.password){
    
        if(!formData.username){
            error.username = 'Need to input a username'
        }
        if(!formData.password){
            error.password = 'Need to input a password'
        }
    }

    if(formData.password !== formData.confirmpassword){
        error.password = 'passwords do not match'
    }
    return error
}


SignUpForm = reduxForm({
    form: 'signUpForm',
    validate: validate
})(SignUpForm)

const mapStateToProps = (state) =>{
    return{
        response: state.authReducer.response,
        token: state.authReducer.hasToken
    }
}

export default connect(mapStateToProps, {signUp})(SignUpForm)