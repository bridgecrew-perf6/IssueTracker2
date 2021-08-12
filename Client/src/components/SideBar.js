import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import "../styles/sidebar.css"

function SideBar({ currentUser }) {
    return (
        <div className="sidebar">
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                <NavLink className="nav-link text-truncate" exact to="/">Homepage</NavLink>
                <NavLink className="nav-link text-truncate" to="/projects">Projects</NavLink>
                <NavLink className="nav-link text-truncate" to={`/${currentUser.user.id}/issues`}>My Issues</NavLink>
                <NavLink className="nav-link text-truncate" to={`/${currentUser.user.id}/profile`}>My Profile</NavLink>
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, null)(SideBar)