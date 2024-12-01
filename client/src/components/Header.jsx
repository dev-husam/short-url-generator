import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'

function Header() {
    const { logout } = useContext(AuthContext)


    const handleLogout = () => {
        logout()
    }
    return (
        <div className='bg-slate-900'>
            <div className='container p-2 mx-auto'>
                <nav className='py-5 flex justify-between'>
                    <div className='text-base text-white'>URL Shorter</div>
                    <div onClick={handleLogout} className='text-base text-white self-end'>Log Out</div>


                </nav>


            </div>
        </div>
    )
}

export default Header