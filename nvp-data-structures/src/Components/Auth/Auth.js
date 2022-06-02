import React, { Component } from 'react'
// import a
import './Auth.css'
import { loginUser,logoutUser } from '../../redux/userReducer'
import { updateCharacters } from '../../redux/breakingBadReducer'
import { connect } from 'react-redux'
import axios from 'axios'
import Info from '../Information/Info'
import Loading from '../Loading/Loading'
import { Route } from 'react-router-dom'

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
        this.handleLogin = this.handleLogin.bind(this)
        // this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.resetState = this.resetState.bind(this)
        // this.displayData = this.displayData.bind(this)
        this.thisLogout = this.thisLogout.bind(this)
    }

    componentDidMount(){
        const { user } = this.props
        // this.props.updateCharacters()
    }

    componentDidUpdate(){
        const { auth } = this.props.user.user
        const { isAuthenticated } = this.state
        if(auth === true && isAuthenticated === false) {
            this.setState({isAuthenticated:true})
        }
        // console.log('auth',auth)
        // console.lo g('characters',characters)
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
            email:'email',
            password:'password'
        })
    }

    handleChange(prop,val){
        this.setState({
            [prop]: val
        })
    }
    
    handleLogin = async () => {
        const { email,password } = this.state
        // console.log('email',email)
        // const { loginUser } = this.props
        this.props.loginUser(email,password)
        // axios.post('/api/auth/login',{email,password}).then(res => {
            // this.setState({user:res.data})
            // this.props.history.push("/info") // marked
        // }).then(
            // )

        // this.resetState()
        // this.displayData()
    }

    displayData = (params) => {
        const { auth } = this.state.user
        console.log('auth',auth)
    }

    // login(){
    //     this.handleLogin()
    // }

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
            // <div className="auth-container">
            <div>
                { !auth === true ?
               <div className="auth-container">

                {/* <img src={logo} alt='logo' /> */}

                <h1 className='auth-title'>Data Structures</h1>
                {this.state.errorMsg && <h3 className='auth-error-msg'>{this.state.errorMsg} <span onClick={this.closeErrorMessage}>X</span></h3>}
                <div className='auth-input-box'>
                    <p >Email:</p>
                    <input value={this.state.email} placeholder={email} onChange={e => this.handleChange('email', e.target.value)} />
                </div>
                <div className='auth-input-box'>
                    <input value={this.state.password} type='password' onChange={e => this.handleChange('password', e.target.value)} />
                </div>
                <div className='auth-button-container'>
                    <button className='dark-button' onClick={() => this.handleLogin()}> Login </button>
                    {/* <button className='dark-button' onClick={this.register}> Register </button> */}
                </div>
                </div>
                // : (<Route path="/info" component={Info}/>)}
                : (<Info logout={this.thisLogout}/>)}
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return reduxState
}

// export default Auth
export default connect(mapStateToProps, {loginUser,logoutUser,updateCharacters})(Auth)
// export default withRouter(connect(null, {loginUser})(Auth))