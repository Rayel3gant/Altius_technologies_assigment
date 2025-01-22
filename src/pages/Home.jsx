import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import SignupModal from '../components/SignupModal';
import LoginModal from '../components/LoginModal';
const Home = () => {
    const [signupModal,setSignupModal]=useState(false)
    const [loginModal,setLoginModal]=useState(false)

    const { register , handleSubmit , formState:{errors}} =useForm()
  return (
    <div className='w-full min-h-[calc(100vh-6rem)] overflow-y-hidden flex  justify-center  items-center gap-x-3 '>
      <button onClick={()=>setSignupModal(true)} className='px-4 py-2 rounded-md border border-black bg-white hover:bg-slate-300 transition-all duration-300 uppercase'>
        Sign up
      </button>

      <button onClick={()=>setLoginModal(true)} className='px-4 py-2 rounded-md border border-black bg-white hover:bg-slate-300 transition-all duration-300 uppercase'>
        Log in
      </button>


      {/* sign up modal */}
      {
        (signupModal === true ) && 
          <SignupModal signupModal={signupModal} setSignupModal={setSignupModal}/>
      }

      {/* log in modal  */}

      {
        (loginModal === true) && 
          <LoginModal loginModal={loginModal} setLoginModal={setLoginModal}/>
      }
    </div>
  )
}

export default Home