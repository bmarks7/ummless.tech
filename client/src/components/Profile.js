import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import '../Styles/Profile.scss'

export default function Profile() {
    const {user, isAuthenticated} = useAuth0();

    return (
        isAuthenticated && (
        <div className='profile'> 
            <img src={user.picture} alt={user.name} className='profile__img'/>
            <div className='profile__nameAndEmail'>
                <span className='profile__nameAndEmail__name'>{user.name}</span><br />
                <span className='profile__nameAndEmail__email'>{user.email}</span>
            </div>
        </div>
        )
    )
}
