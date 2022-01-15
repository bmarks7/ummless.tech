import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import '../Styles/Login.scss'

export const LoginButton = () => {
    const{loginWithRedirect, isAuthenticated} = useAuth0();

    return (
        !isAuthenticated && (
            <p onClick={() => loginWithRedirect()} className='loginBtn'>
                Log in / Sign up
            </p>
        )
    )
}
