import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from '../store/actions/authActions'
import { removeError } from '../store/actions/errorActions'
import '../styles/authForm.css'

export default function AuthForm(props) {
  const { signup, history } = props
  const { errors } = useSelector(state => state)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    username: "",
    password: "",
    email: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const authType = signup ? "signup" : "login"
    dispatch(authUser(authType, state))
      .then(() => history.push("/"))
      .catch(err => { return })
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  history.listen(() => {
    dispatch(removeError())
  })
  return (
    <div className="authFormContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <div className="loginInputs">
          {signup &&
            <div className="mb-3" >
              <label htmlFor="email" className="form-label">Email Address</label>
              <input onChange={handleChange} type="text" className="form-control" name="email" placeholder="name@example.com" />
            </div>
          }
          <div className="mb-3" >
            <label htmlFor="username" className="form-label">Username</label>
            <input onChange={handleChange} type="text" className="form-control" name="username" />
          </div>
          <div className="mb-3" >
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={handleChange} type="password" className="form-control" name="password" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      {errors.message &&
        <div className="alert alert-danger" role="alert">
          {errors.message}
        </div>
      }
    </div>
  )
}