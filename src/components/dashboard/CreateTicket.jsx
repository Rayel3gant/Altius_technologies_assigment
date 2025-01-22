import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createNewTicket } from '../../services/operations'
import Loader from "../Loader"

const CreateTicket = () => {
  const { register , handleSubmit , formState:{errors}} =useForm()
  const dispatch=useDispatch()
  const { userData , token , loading } =useSelector((state)=>state.auth)


  const submuHandler=(data)=>{
    const newData={
      ...data,
      name:userData.name
    }
    dispatch(createNewTicket(newData, userData.token))

  }
  return (
    <div>
      {
        (loading===true)? (
          <div className='w-full h-full flex justify-center items-center'>
            <Loader/>
          </div>
        ) : (
          <form onSubmit={handleSubmit(submuHandler)} className='flex flex-col gap-y-4 w-11/12 lg:w-3/4 mx-auto border border-1 rounded-md py-5 px-8 border-blue-800'>
            <div className='flex flex-col'>
                <label htmlFor='title' className='text-xs'>Ticket Title</label>
                <input type='text' id='title' name='title' placeholder='enter ticket title' className='w-100 formInput' {...register('title',{required:true})}/>
                {
                errors.title && <span className='text-xs text-red-500'>please enter ticket title</span>
                }
            </div>

            <div className='flex flex-col'>
                <label htmlFor='description' className='text-xs'>Note : (optional) </label>
                <input type='text' id='description' name='description' placeholder='enter note description' className='w-100 formInput' {...register('description',{required:true})}/>
                
            </div>


            <button type='submit' className='mt-3 place-self-start px-4 py-2 rounded-md bg-[#1E90FF] text-white font-semibold '> 
                Create
            </button>

          
          </form>
        )
         
      }
      
    </div>
  )
}

export default CreateTicket