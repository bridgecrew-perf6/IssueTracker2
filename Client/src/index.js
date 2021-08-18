import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import Navbar from './components/Navbar'
import SideBar from './components/SideBar'
import { setTokenHeader, setUser } from './store/actions/authActions'
import jwtDecode from 'jwt-decode'


const store = configureStore()

if (localStorage.jwt) {
  try {
    setTokenHeader(localStorage.jwt)
    store.dispatch(setUser(jwtDecode(localStorage.jwt)))
  } catch (err) {
    store.dispatch(setUser({}))
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div className="componentContainer">
        <SideBar />
        <App />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)
