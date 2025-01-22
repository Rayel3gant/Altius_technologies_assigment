import React, { useEffect, useRef, useState } from 'react'
import { Input, Modal } from "antd";
import { useForm } from 'react-hook-form';
import { IoMdEye , IoMdEyeOff } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { signup } from '../services/operations';


const SignupModal = ({signupModal , setSignupModal}) => {
  const modalRef = useRef(null); 
  const { register , handleSubmit , formState:{errors}} =useForm()
  const [passwordType,setPasswordType]=useState('password')
  const dispatch=useDispatch()
  
  // Handle click outside of the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSignupModal(false)
    }
  };

  useEffect(() => {
      if (signupModal) {
          document.addEventListener("mousedown", handleClickOutside);
      } else {
          document.removeEventListener("mousedown", handleClickOutside);
      }

      // Cleanup listener on unmount or visibility change
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [signupModal]);

  const submitHandler=(data)=>{
    console.log(data)
    setSignupModal(false)
    dispatch(signup(data))
  }

  return (
    <Modal classNames=' ' open={signupModal}  footer={null} closable={false} style={{top: 20,}}>
      <div ref={modalRef} className='px-3 py-5'>
        <div className='text-lg '>Sign up</div>
        <div className='w-full h-[1px] bg-black mt-1'/>

        <form onSubmit={handleSubmit(submitHandler)} className='mt-3 flex flex-col gap-y-4'>

          <div className='flex flex-col'>
            <label htmlFor='name' className='text-xs'>Name</label>
            <input type='text' id='name' name='name' placeholder='enter name' className='w-100 formInput' {...register('name',{required:true})}/>
            {
              errors.name && <span className='text-xs text-red-500'>please enter name</span>
            }
          </div>

          <div className='flex flex-col'>
            <label htmlFor='email' className='text-xs'>Email</label>
            <input type='email' id='email' name='email' placeholder='enter email' className='w-100 formInput' {...register('email',{required:true})}/>
            {
              errors.email && <span className='text-xs text-red-500'>please enter email</span>
            }
          </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className='text-xs'>Password</label>
            <div className='w-100 formInput flex justify-between items-center'>
              <input id='password' name='password' type={passwordType} className='w-[80%] border-0 outline-none bg-transparent' placeholder='enter password' {...register('password',{required:true})} />

              <div className='cursor-pointer'>
              {
                (passwordType==='password')?<IoMdEye onClick={()=>setPasswordType('text')} /> : <IoMdEyeOff onClick={()=>setPasswordType('password')}/>
              }
              </div>
            </div>
            {
              errors.password && <span className='text-xs text-red-500'>please enter password</span>
            }
          </div>

          <button type='submit' className='mt-3 place-self-start px-4 py-2 rounded-md bg-[#1E90FF] text-white font-semibold '> 
            Sign Up
          </button>

        </form>
      </div>
    </Modal>
  )
}

export default SignupModal