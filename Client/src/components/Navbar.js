import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/authActions'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
function Navbar() {
  const { currentUser } = useSelector(state => state)
  const dispatch = useDispatch()
  const buttons = () => {
    if (currentUser.isAuthenticated) {
      const handleLogout = () => dispatch(logout())
      return (
        <>
          <NavLink className="nav-link text-truncate" exact to="/">Homepage</NavLink>
          <NavLink className="nav-link text-truncate" to="/projects">Projects</NavLink>
          <NavLink className="nav-link text-truncate" to={`/issues`}>My Issues</NavLink>
          <NavLink className="nav-link text-truncate" to={`/${currentUser.user.id}/profile`}>My Profile</NavLink>
          <a onClick={handleLogout} className="nav-link text-truncate">Logout</a>
        </>
      )
    } else {
      return (
        <>
          <NavLink className="nav-link text-truncate" to="/login">Login</NavLink>
          <NavLink className="nav-link text-truncate" to="/Signup">Signup</NavLink>
        </>
      )
    }
  }
  return (
    <div className="navbars">
      {buttons()}
    </div>
  )
}

export default Navbar