import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import { createNewProfile } from '../../services/operations'
import { useDispatch, useSelector } from 'react-redux'

const CreateProfile = () => {
  const { register , handleSubmit , formState:{errors}} =useForm()
  const { loading , userData  } =useSelector((state)=>state.auth)
  const [passwordType,setPasswordType]=useState('password')
  const [role,setRole]=useState('Customer')
  const dispatch=useDispatch()

  const submitHandler=(data)=>{
    const newData={
      ...data,
      role:role
    }
    createNewProfile(newData,userData.token, dispatch )
  }
  return (
    <div className='w-11/12 mx-auto bg-white rounded-xl'>
      <form onSubmit={handleSubmit(submitHandler)} className='flex flex-col gap-y-5  p-5 md:p-12'>
      
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
        

        <div className='flex flex-col'>
          <label htmlFor='role' className='text-xs'>Profile type:</label>
          <div className={`flex items-center gap-x-3 `}>
            {
              ["Agent","Customer"].map((item)=>(
                <div onClick={()=>setRole(item)} className={`cursor-pointer px-3 py-2 rounded-md w-fit transition-all font-semibold  duration-500 ${(role===item)?"bg-yellow-400 text-black":"bg-white text-black border"}`}>
                    {item}
                </div>                     
              ))
            }             
          </div>
        </div>
        

        <button type='submit' className='mt-3 place-self-start px-4 py-2 rounded-md bg-[#1E90FF] text-white font-semibold '> 
          Create Profile
        </button>


      </form>
    </div>
  )
}

export default CreateProfile