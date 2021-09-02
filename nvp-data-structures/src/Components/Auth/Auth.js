import React, { Component } from 'react'
import './Auth.css'

class Auth extends Component {

    constructor(){
        super();

        this.state = {

        }
    }

    render() {

        return(
            <div className="auth-container">
                {/* <img src={logo} alt='logo' /> */}
                <h1 className='auth-title'>Data Structures</h1>
                {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
                <div className='auth-input-box'>
                    <p className="auth-p">Username:</p>
                    <input value={this.state.user_name} onChange={e => this.handleChange('user_name', e.target.value)} />
                </div>
                <div className='auth-input-box'>
                    <p className="auth-p">Password:</p>
                    <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
                </div>
                <div className='auth-button-container'>
                    <button className='dark-button' onClick={this.login}> Login </button>
                    {/* <button className='dark-button' onClick={this.register}> Register </button> */}
                </div>
            </div>
        )
    }
}

export default Auth