import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from './store'
import Navbar from './components/Navbar'


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <div className="componentContainer">
        <App />
      </div>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)
