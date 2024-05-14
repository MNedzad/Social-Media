import React from 'react'

function ProfileMenu() {
 
    return (
    <>
    <h1>Profile Menu</h1>
    <div className='logout'><button onClick={() =>{ localStorage.removeItem('accessToken'); location.reload() }}>Log Out</button></div>
    </>
    )
}

export default ProfileMenu