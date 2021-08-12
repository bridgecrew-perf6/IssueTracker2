import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./reducers";
import reduxPromise from 'redux-promise'

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(thunk, reduxPromise))
    return store
}


