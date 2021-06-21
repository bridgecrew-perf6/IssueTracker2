import axios from 'axios'
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

export default function Main() {
    return (
        <div>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="/test">Test</Link>
        </div>
    )
}