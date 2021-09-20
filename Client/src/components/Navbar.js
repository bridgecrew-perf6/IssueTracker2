import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import '../styles/navbar.css'
function Navbar({ currentUser }) {
    const buttons = () => {
        if (currentUser.isAuthenticated) {
            return (
                <>
                    <NavLink className="nav-link text-truncate" exact to="/">Homepage</NavLink>
                    <NavLink className="nav-link text-truncate" to="/projects">Projects</NavLink>
                    <NavLink className="nav-link text-truncate" to={`/issues`}>My Issues</NavLink>
                    <NavLink className="nav-link text-truncate" to={`/${currentUser.user.id}/profile`}>My Profile</NavLink>
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

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, null)(Navbar)