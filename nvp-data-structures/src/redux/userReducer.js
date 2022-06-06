import axios from 'axios'

const initialState = {
    user: {},
    isLoggedIn:false,
    isLoading:false,
    isError:false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const BROWSER_LOGIN = 'BROWSER_LOGIN'

export function loginUser(email, password, browser_id) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/api/auth/login', {email,password,browser_id}).catch(err => console.log('error',err))
    }
}

export function browserLogin(email,browser_id) {
    console.log('hit function',email,browser_id)
    return {
        type:BROWSER_LOGIN,
        payload: axios.post('/api/auth/browser/login', {email,browser_id}).catch(err => console.log('error',err))
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

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        // ---- MANUAL LOGIN ---- //
        case LOGIN_USER + '_PENDING':
            return {
                ...state,
                isLoading:true
            }
            case LOGIN_USER + '_FULFILLED':

            return {
                ...state,
                user: action.payload.data, isLoggedIn:true, isLoading:false
            }
        case LOGIN_USER + '_REJECTED':
            
            return {
                ...state,
                isLoading:false,
                isError:true
            }

        // ---- AUTO LOGIN ---- //
        case BROWSER_LOGIN + '_PENDING':
            return {
                ...state,
                isLoading:true,
            }
        case BROWSER_LOGIN+ '_FULFILLED':
            console.log('hit fulfilled')
            return {
                ...state,
                user: action.payload.data, isLoggedIn:true, isLoading:false
            }
        case BROWSER_LOGIN + '_REJECTED':
            return {
                ...state,
                isLoading:false,
                isError:true
            }

        // ---- LOGOUT ---- //
        case LOGOUT_USER + '_PENDING':
            return {
                ...state, isLoading: true,
            }

        case LOGOUT_USER + '_FULFILLED':
            return {
                ...state, isLoggedIn: false,
                user: {},
            }

        default:
            return state 
    }
}