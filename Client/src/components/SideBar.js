import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../store/actions/authActions'
import { NavLink } from 'react-router-dom'
import "../styles/sidebar.css"

function SideBar() {
  const { currentUser } = useSelector(state => state)
  const { isAuthenticated } = currentUser
  const { id: userId } = currentUser.user
  const dispatch = useDispatch()
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(prev => !prev);
  const handleHover = () => setHover(true)
  const handleHover2 = () => setHover(false)
  const handleLogout = () => {
    dispatch(logout())
  }
  const openButton = () =>
    hover ? <i onMouseLeave={handleHover2} onClick={handleShow} className={`bi bi-arrow-${show ? "left" : "right"}`}></i>
      : <i onMouseEnter={handleHover} className="bi bi-list"></i>
  if (isAuthenticated) {
    return (
      show ?
        <div className="sidebar open">
          HELLLLL
          <div className="icon">
            {openButton()}
          </div>
          <ul className="items">
            <li  className="list-item">
              <i className="bi bi-card-list"></i>
              <NavLink onClick={handleClose} className="nav-link" to="/">Projects</NavLink>
            </li>
            <li className="list-item">
              <i className="bi bi-person-circle"></i>
              <NavLink onClick={handleClose} className="nav-link" to={`/${userId}/profile`}>Issues</NavLink>
            </li>
            <li className="list-item">
              <i className="bi bi-power"></i>
              <button onClick={handleLogout} className="nav-link sidebar-button">Logout</button>
            </li>
          </ul>
        </div>
        :
        <div className="sidebar collapsed">
          <div className="icon-collapse">
            {openButton()}
          </div>
          <div className="items">
            <NavLink onClick={handleClose} to="/"><i className="bi bi-card-list"></i></NavLink>
            <NavLink onClick={handleClose} to={`/${userId}/profile`}><i className="bi bi-person-circle"></i></NavLink>
            <button onClick={handleLogout} className="sidebar-button"><i className="bi bi-power"></i></button>
            
          </div>
        </div>
    )
  }
  return (null)
}

export default SideBar