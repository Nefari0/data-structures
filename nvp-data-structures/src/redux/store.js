// import { createStore } from 'redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxPromiseMiddleware from 'redux-promise-middleware'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from './userReducer'

const rootReducer = combineReducers({
    user: userReducer
})

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(reduxPromiseMiddleware))
  )

// export default createStore(reducer)