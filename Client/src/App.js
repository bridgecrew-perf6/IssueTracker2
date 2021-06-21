import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Main from './components/Main'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Test from './components/Test'
import { connect } from 'react-redux';

function App(props) {
  const { state, dispatch } = props
  return (
    <div>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/signup" render={() => <SignUp />} />
        <Route exact path="/test" render={() => <Test />} />
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

export default connect(mapStateToProps, null)(App);
