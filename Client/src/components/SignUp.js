import React from 'react'

export default function Main() {
    return(
        <div>
            <form action="http://localhost:3080/api/auth/signup" method="POST">
                Name
                <input type="text" name="username" id="username"/>
                Password
                <input type="text" name="password" id="password"/>
                <button>Register</button>
            </form>
        </div>
    )
}