import React, { Component } from 'react'
import './Auth.css'
import { loginUser,logoutUser } from '../../redux/userReducer'
import { connect } from 'react-redux'

class Auth extends Component {

    constructor(props){
        super(props);

        this.state = {
            user:{},
            email:'email',
            password:'password',
            setPermission:true,
            isAuthenticated:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetState = this.resetState.bind(this)
        this.thisLogout = this.thisLogout.bind(this)
    }

    componentDidMount(){
        const { user } = this.props
    }

    componentDidUpdate(){
        const { auth,id } = this.props.user.user
        const { isAuthenticated } = this.state
        if(auth === true && isAuthenticated === false) {
            this.setState({isAuthenticated:true})
            this.props.history.push(`/info/${id}`)
        }
    }

    resetState(){
        this.setState({
            email:'email',
            password:'password'
        })
    }

    handleChange(prop,val){
        this.setState({
            [prop]: val
        })
    }
    
    // handleLogin = async () => {
    //     const { email,password } = this.state

    thisLogout() {
        this.setState({
            isAuthenticated:false,
            user:{}
        })
    }


    render() {
        const { auth } = this.props.user.user
        const { email,password } = this.state

        return(
            <div>
               <div className="auth-container">
                    <h1 className='auth-title'>Data Structures</h1>
                    {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
                    <div className='auth-input-box'>
                        <p >Email:</p>
                        <input placeholder={email} onChange={e => this.handleChange('email', e.target.value)} />
                    </div>
                    <div className='auth-input-box'>
                        <p >Password:</p>
                        <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
                    </div>
                    <div className='auth-button-container'>
                        <button className='dark-button' onClick={() => this.props.loginUser(email,password)}> Login </button>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return reduxState
}

export default connect(mapStateToProps, {loginUser,logoutUser})(Auth)