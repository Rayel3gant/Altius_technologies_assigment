import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/operations'

const Logout = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const logoutHandler=()=>{
        dispatch(logout(navigate))
    }

  return (
    <div className='w-11/12 mx-auto mt-5 rounded-md bg-blue-900 text-white px-5 py-8'>
        <div className='text-xl font-bold'>Are You Sure?</div>
        <div className='text-lg font-semibold italic'>You will be logged out of your account</div>

        <button onClick={logoutHandler} className='mt-3 place-self-start px-4 py-2 rounded-md bg-red-500 hover:bg-red-700 transition-all duration-200 text-white font-semibold '> 
            Log out
        </button>

    </div>
  )
}

export default Logout