import React from 'react'
import {useAuth0} from '@auth0/auth0-react'
import '../Styles/Logout.scss'

export default function LogoutButton() {
    const {logout, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
            <p onClick={() => logout()} className='logoutBtn'>
                Log out
            </p>
        )
    )
}
