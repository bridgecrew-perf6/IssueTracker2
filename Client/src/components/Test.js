import React from 'react'

export default function Test() {
    const obs = {name: "bijay", otherName: "asshole", job: "homeless"}
    const {name, ...user} = obs
    return(
        <div>
            <h1>Hello</h1>
        </div>
    )
}