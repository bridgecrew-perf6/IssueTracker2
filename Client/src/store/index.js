import { applyMiddleware, createStore, compose } from "redux";
import thunk from 'redux-thunk'
import rootReducer from "./reducers";
import reduxPromise from 'redux-promise'

export default function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, reduxPromise)
    ))
  return store
}
