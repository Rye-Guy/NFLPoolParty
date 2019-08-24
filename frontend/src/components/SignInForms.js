import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class SignInForms extends Component{
    
    sendErrorMessage = (touched, errorMessage)=>{
        if(touched && errorMessage){
            return (
                <div style={{'display':'block'}} className='ui error message'>
                    <div className='header'>{errorMessage}</div>
                </div>
            )
        }
    }

    renderInput = (formProps) =>{
        console.log(formProps)
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`
        return(
            
            <div className={className}>
                <label htmlFor={formProps.input.name}>{formProps.label}</label>
                <input {...formProps.input} autoComplete='off' />
                    
                {this.sendErrorMessage(formProps.meta.touched, formProps.meta.error)}
            </div>    
        )
    }
    
    onSubmit = (formData)=>{
        console.log(formData)
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
                    </div>
                    <div className="column">
                        <h2>Sign Up</h2>
                        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form'>
                            <Field name='createusername' type='text' component={this.renderInput} label='Enter Username'></Field>
                            <Field name='createpassword' type="password" component={this.renderInput} label='Enter Password'></Field>
                            <button className='ui button primary'>Submit</button>
                        </form>
                    </div>
                </div>
        )
    }
}

const validate = (formData)=>{
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

export default reduxForm({
    form: 'signInForm',
    validate: validate
})(SignInForms)

