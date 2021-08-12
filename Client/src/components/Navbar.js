import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/navbar.css'
export default function Navbar() {

    return (
            <div className="navbars">
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/Signup">Signup</NavLink>
            </div>
    )
}