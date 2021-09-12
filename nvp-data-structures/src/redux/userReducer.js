import axios from 'axios'

const initialState= {
    user: {},
    isLoggedIn:false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(email, password) {
    console.log(email)
    return {
        type: LOGIN_USER,
        payload: axios.get('/api/auth/login', {email,password})
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: axios.get('/api/auth/logout')
    }
}

// export function registerUser(first_name,last_name,email,password) {

// }

export default function userReducer(state = initialState,action) {
    switch (action.type) {
        case LOGIN_USER + '_FULFILLED':
            return {
                ...state,
                user: action.payload, isLoggedIn:true
            }
        case LOGOUT_USER + '_FULLFILLED':
            return {
                ...state, isLoggedIn: false
            }
        default:
            return state 
    }
}