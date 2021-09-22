import React from 'react'
import CloseButton from 'react-bootstrap/CloseButton'
function Main(props) {
    const { currentUser } = props
    if (currentUser.isAuthenticated) {
        return (
            <div>
                Logged in As &nbsp;
                {currentUser.user.username}
                <CloseButton variant="white" />
            </div>
        )
    }
    return (
        <div>
            <h1>
                Not Logged In Mate
            </h1>
        </div>
    )
}

export default Main