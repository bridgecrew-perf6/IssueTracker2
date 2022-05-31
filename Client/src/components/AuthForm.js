import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authUser } from "../store/actions/authActions"
import { removeError } from "../store/actions/errorActions"
import { AnimatePresence, motion } from "framer-motion"
import "../styles/authForm.css"
import { Link } from "react-router-dom"

export default function AuthForm(props) {
  const { signup, history } = props
  const { errors } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const [state, setState] = useState({
    username: "",
    password: "",
    email: "",
  })

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    const authType = signup ? "signup" : "login"
    dispatch(authUser(authType, state, setLoading))
  }

  const loginGuest = (e) => {
    setLoading(true)
    e.preventDefault()
    dispatch(
      authUser("login", { username: "guest", password: "guest" }, setLoading)
    )
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  history.listen(() => {
    dispatch(removeError())
  })
  return (
    <div className="authFormContainer">
      <div className="formBox d-flex align-items-center">
        <div className="d-flex flex-column signupBox bg-glass">
          <AnimatePresence>
            <motion.form className="authForm">
              {signup ? (
                <motion.div
                  className="loginInputs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={1}
                >
                  <span className="inputTitle">Sign Up</span>
                  <div className="mb-3 emptySpace">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      name="email"
                      placeholder="name@example.com"
                    />
                  </div>
                  <div className="mb-3 emptySpace">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      name="username"
                    />
                  </div>
                  <div className="mb-3 emptySpace">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      name="password"
                    />
                  </div>
                  <div className="loginButtons emptySpace">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Sign Up
                    </button>
                  </div>
                  <span className="signupPrompt">
                    Already have an account <Link to="/login">Log In?</Link>
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  className="loginInputs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  key={2}
                >
                  <span className="inputTitle">Login to your account</span>
                  <div className="mb-3 emptySpace">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      name="username"
                    />
                  </div>
                  <div className="mb-3 emptySpace">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={handleChange}
                      type="password"
                      className="form-control"
                      name="password"
                    />
                  </div>
                  <div className="loginButtons emptySpace">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Log In
                    </button>
                    <span onClick={loginGuest}>Login As Guest</span>
                  </div>
                  <span className="signupPrompt">
                    Don't have an account <Link to="/signup">Sign Up?</Link>
                  </span>
                </motion.div>
              )}
            </motion.form>
            {loading && (
              <>
                <div className="spinner-border mt-3" role="status"></div>
                <span>Loading...</span>
              </>
            )}
            {errors.message && (
              <div className="alert alert-danger mt-3" role="alert">
                {errors.message}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
