import React from 'react'

const Navigation = (({leave, isSignedIn})=>{
    if (isSignedIn)
        return (
            <nav className='w-100'
                style={{display: 'flex', 'justifyContent': 'end'}}
                onClick={() => leave('signout')} >
                <p className="f3 link dim black underline mr5 pointer">Sign out</p>
            </nav>
        )

    else
        return (
            <nav className='w-100'
                style={{display: 'flex', 'justifyContent': 'end'}}>
                <p onClick={() => leave('signin')} className="f3 link dim black underline mr5 pointer">Sign in</p>
                <p onClick={() => leave('register')} className="f3 link dim black underline mr5 pointer">Register</p>
            </nav>
        )
})

export default Navigation