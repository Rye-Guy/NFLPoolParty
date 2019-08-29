import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import { signIn, signUp } from '../actions'

class SignInForms extends Component{

    componentDidUpdate(){
        console.log(this.props)
    }
    
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
        console.log(formProps)
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`
        return(
            
            <div className={className}>
                <label htmlFor={formProps.input.name}>{formProps.label}</label>
                <input {...formProps.input} type={formProps.type} autoComplete='off' />
                    
                {this.sendErrorMessage(formProps.meta.touched, formProps.meta.error)}
            </div>    
        )
    }
    
    onSubmit = (formData) => {
        if(formData.createusername){
            this.props.signUp(formData)
        }else if(formData.username){
            this.props.signIn(formData)
        }
        console.log(formData)
        
    }

    renderResponseError = () => {
        if(this.props.response){
            if(this.props.response.config.url === "http://localhost:8888/token-auth/" && this.props.response.status === 400){
                 return (
                    <div style={{'display':'block'}} className='ui error message'>
                        <div className='header'>We could not log you in with credentials provided</div>
                    </div>
                )
            }
        }
    }
    renderSignUpError = () =>{
        if(this.props.response){
            if(this.props.response.config.url === "http://localhost:8888/nfl/users/" && this.props.response.status === 400){
                    return (
                        <div style={{'display':'block'}} className='ui error message'>
                            <div className='header'>We could not create your user! (Sorry)</div>
                            <div className='content'>There is probably a user with this username already</div>
                        </div>
                    )
            }
        }
    }

    render(){
        return(
                <div className="ui equal width grid">
                    <div className="column">
                    <h2>Login</h2>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
                            <Field name='username' type='text' component={this.renderInput} label='Enter Username'></Field>
                            <Field name='password' type="password" component={this.renderInput} label='Enter Password'></Field>
                            <button className='ui button primary'>Submit</button>
                        </form>
                        {this.renderResponseError()}
                    </div>
                    <div className="column">
                        <h2>Sign Up</h2>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
                            <Field name='createusername' type='text' component={this.renderInput} label='Enter Username'></Field>
                            <Field name='createpassword' type="password" component={this.renderInput} label='Enter Password'></Field>
                            <button className='ui button primary'>Submit</button>
                        </form>
                        {this.renderSignUpError()}
                    </div>
                </div>
        )
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
    if(formData.createusername || formData.createpassword){
        if(!formData.createusername){
            error.createusername = 'Need to input a username'
        }
        if(!formData.createpassword){
            error.createpassword = 'Need to input a password'
        }
    }
    return error
}



SignInForms = reduxForm({
    form: 'signInForm',
    validate: validate
})(SignInForms)

const mapStateToProps = (state) =>{
    return{
        response: state.authReducer.response
    }
}

export default connect(mapStateToProps, {signIn, signUp})(SignInForms)

