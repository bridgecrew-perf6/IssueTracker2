import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from '../store/actions/authActions'
import { removeError } from '../store/actions/errorActions'
import { useMediaQuery } from 'react-responsive'
import '../styles/authForm.css'
import { Link } from 'react-router-dom'

export default function AuthForm(props) {
  const { signup, history } = props
  const { errors } = useSelector(state => state)
  const dispatch = useDispatch()
  const isMobile = useMediaQuery({ maxWidth: 767 }) ? "isMobile" : ""


  const [state, setState] = useState({
    username: "",
    password: "",
    email: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const authType = signup ? "signup" : "login"
    dispatch(authUser(authType, state))
      .catch(err => { return })
  }

  const loginGuest = (e) => {
    e.preventDefault()
    dispatch(authUser("login", { username: "guest", password: "guest" }))
      .catch((err) => {
        return
      })
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  history.listen(() => {
    dispatch(removeError())
  })
  return (
    <div className="authFormContainer">
      <div className={`signupBox ${isMobile}`}>
        <form className="authForm" >
          <div className="loginInputs">
            {signup 
            ? <span className="inputTitle" >Sign Up</span>
            : <span className="inputTitle" >Login to your account</span>
            }
            {signup &&
              <div className="mb-3 emptySpace" >
                <label htmlFor="email" className="form-label">Email Address</label>
                <input onChange={handleChange} type="text" className="form-control" name="email" placeholder="name@example.com" />
              </div>
            }
            <div className="mb-3 emptySpace" >
              <label htmlFor="username" className="form-label">Username</label>
              <input onChange={handleChange} type="text" className="form-control" name="username" />
            </div>
            <div className="mb-3 emptySpace" >
              <label htmlFor="password" className="form-label">Password</label>
              <input onChange={handleChange} type="password" className="form-control" name="password" />
            </div>
          </div>
          <div className="loginButtons emptySpace">
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">{signup ? "Sign Up" : "Log In"}</button>
            {!signup && <span onClick={loginGuest}>Login As Guest</span>}
          </div>
        </form>
      </div>
      {!signup && <span className="signupPrompt">Don't have an account <Link to="/signup">Sign Up?</Link></span>}
      {signup && <span className="signupPrompt">Already have an account <Link to="/login">Log In?</Link></span>}
      {errors.message &&
        <div className="alert alert-danger" role="alert">
          {errors.message}
        </div>
      }
    </div>
  )
}