import React, { Component } from 'react'
import './Auth.css'
import { loginUser,browserLogin } from '../../redux/userReducer'
import { connect } from 'react-redux'

class Auth extends Component {

    constructor(props){
        super(props);

        this.state = {
            email:'',
            password:'',
        }
    }

    theWindow(prop,val){
        localStorage.setItem(prop,val)
    };

    componentDidMount(){
        const browser_id = localStorage['browser_id']
        const uniqueId = () => {
            const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            return s4() + s4() + '-' + s4();
        }

        if(browser_id === undefined){this.theWindow('browser_id',uniqueId())}
    };

    componentDidUpdate(){
        const { auth,email } = this.props.user.user

        if(auth === true) {
            this.theWindow('email',email)
            this.props.history.push(`/info`)
        }
    };

    handleChange(prop,val){
        this.setState({
            [prop]: val
        })
    };

    render() {
        const { email,password } = this.state
        const browser_id = localStorage['browser_id'] // -- Added to user table

        return(
               <div className="auth-container">
                    <h1 style={{color:'black'}} >Data Structures</h1>
                    <div>
                        <p >Email:</p>
                        <input placeholder="email" onChange={e => this.handleChange('email', e.target.value)} style={{width:'100%'}} />
                    </div>
                    <div>
                        <p >Password:</p>
                        <input type='password' onChange={e => this.handleChange('password', e.target.value)} style={{width:'100%'}} />
                    </div>
                    <div >
                        <button onClick={() => this.props.loginUser(email,password,browser_id)}> Login </button>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(reduxState){
    return reduxState
}

export default connect(mapStateToProps, {loginUser,browserLogin})(Auth)