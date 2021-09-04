import React, { Component } from 'react'
import './Auth.css'
import { loginUser,logoutUser } from '../../redux/userReducer'
import { connect } from 'react-redux'

class Auth extends Component {

    constructor(props){
        super();

        this.state = {
            email:'',
            password:''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    // componentDidMount(){
    //     const { user } = this.props
    // }

    componentWillUpdate(){
        const { user } = this.props
    }

    resetState(){
        this.setState({
            email:'',
            password:''
        })
    }

    handleChange(prop,val){
        this.setState({
            [prop]: val
        })
    }
    
    handleLogin(){
        const { email,password } = this.state
        const { loginUser } = this.props
        loginUser(email,password)
        this.resetState()
    }

    login(){
        this.handleLogin()
    }


    render() {

        return(
            <div className="auth-container">
                {/* <img src={logo} alt='logo' /> */}
                <h1 className='auth-title'>Data Structures</h1>
                {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
                <div className='auth-input-box'>
                    <p className="auth-p">Email:</p>
                    <input value={this.state.email} onChange={e => this.handleChange('email', e.target.value)} />
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

function mapStateToProps(reduxState){
    return reduxState
}

// export default Auth
export default connect(mapStateToProps, {loginUser})(Auth)