import React, { Component } from 'react'
// import a
import './Auth.css'
import { loginUser,logoutUser } from '../../redux/userReducer'
import { characters } from '../../redux/breakingBadReducer'
import { connect } from 'react-redux'
import axios from 'axios'

class Auth extends Component {

    constructor(props){
        super(props);

        this.state = {
            user:{},
            email:'',
            password:'',
            setPermission:true,
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.resetState = this.resetState.bind(this)
    }

    componentDidMount(){
        const { user } = this.props
    }

    componentWillUpdate(){
        // console.log('characters',characters)
        // const { user } = this.props
        // const { setPermission } = this.state

        // if(user.isLoggedIn === true && setPermission===true){
        //     // this.setState({username:user.user.data.user,setPermission:false})
        //     this.setState({username:user.user.user.user,isLoggedInState:user.isLoggedIn,setPermission:false})
        // }
    }

    //     componentDidUpdate(){
    //     const { user } = this.props
    //     console.log('this. props',this.props)
    // }

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
        console.log('email',email)
        // const { loginUser } = this.props
        // loginUser(email,password)
        axios.post('/api/auth/login',{email,password}).then(res => {
            this.setState({user:res.data})
        })
        // this.resetState()
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
                    <button className='dark-button' onClick={this.handleLogin}> Login </button>
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
export default connect(mapStateToProps, {loginUser,logoutUser})(Auth)