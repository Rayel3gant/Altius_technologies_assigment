import React, { useEffect, useRef, useState } from 'react'
import { Modal } from "antd";
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/operations';


const LoginModal = ({loginModal , setLoginModal }) => {
  const modalRef = useRef(null); 
  const { register , handleSubmit , formState:{errors}} =useForm()
  const [passwordType,setPasswordType]=useState('password')
  const navigate=useNavigate()
  const dispatch=useDispatch()
  // Handle click outside of the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
        setLoginModal(false)
    }
  };

  useEffect(() => {
      if (loginModal) {
          document.addEventListener("mousedown", handleClickOutside);
      } else {
          document.removeEventListener("mousedown", handleClickOutside);
      }

      // Cleanup listener on unmount or visibility change
      return () => {
          document.removeEventListener("mousedown", handleClickOutside);
      };
  }, [loginModal]);

  const submitHandler=(data)=>{
    console.log(data)
    dispatch(login(data,navigate))

  }

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return (
    <Modal classNames=' ' open={loginModal}  footer={null} closable={false} style={{top: 20,}}>
      <div ref={modalRef} className='px-3 py-5'>
        <div className='text-lg '>Log In</div>
        <div className='w-full h-[1px] bg-black mt-1'/>

        <form onSubmit={handleSubmit(submitHandler)} className='mt-3 flex flex-col gap-y-4'>

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
            Log in
          </button>

        </form>
      </div>
    </Modal>
  )
}

export default LoginModal