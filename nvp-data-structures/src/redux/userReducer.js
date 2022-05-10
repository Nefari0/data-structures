import axios from 'axios'

const initialState = {
    user: {},
    isLoggedIn:false,
    isLoading:false,
    isError:false
}

const LOGIN_USER = 'LOGIN_USER'
const LOGOUT_USER = 'LOGOUT_USER'

export function loginUser(email, password) {
    const theData = axios.post('/api/auth/login', {email,password})
    
    console.log('data in ducks',theData)
    return {
        type: LOGIN_USER,
        // payload: axios.post('/api/auth/login', {email,password}).catch(err => console.log('error',err))
        payload:theData
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
        case LOGIN_USER + '_PENDING':
            console.log('hit pending')
            return {
                ...state,
                isLoading:true
            }
            case LOGIN_USER + '_FULFILLED':
            // console.log('action type', action.type)
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
        case LOGOUT_USER + '_FULFILLED':
            return {
                ...state, isLoggedIn: false
            }
        default:
            return state 
    }
}