import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProfile, getAllProfiles } from '../../services/operations'
import { MdDelete } from "react-icons/md";
import { Modal } from 'antd';


const ManageProfiles = () => {
const { loading , userData  } =useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const [deleteModal,setDeleteModal]=useState(false)

  const [profilesList,setProfilesList]=useState([])
  const [profileId,setProfileId]=useState(null)
  const [profilesUpdate,setProfilesUpdate]=useState(false)

  const fetchProfiles = async () => {
    try {
      const result = await getAllProfiles(userData.token,dispatch);
      if(result){
        setProfilesList(result)
      }
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  useEffect(()=>{
    fetchProfiles()
  },[])

  const deleteModalHandler=(id)=>{
    setDeleteModal(true)
    setProfileId(id)
  }
  const deleteHandler=()=>{
    deleteProfile(profileId,userData.token, dispatch)
    setDeleteModal(false)
    setTimeout(()=>{
      setProfilesUpdate(true)
    },300)
  }

  //after deleteting ,refetch all profiles
  useEffect(()=>{
    if(profilesUpdate){
      fetchProfiles()
      setProfilesUpdate(false)
    }
  },[profilesUpdate])

  return (
    <div>
    {
      profilesList.length===0? (
        <div>
          no profiles found
        </div>
      ) : (
        <div className='flex flex-col gap-y-4'>
        {
          profilesList.map((item)=>(
            <div key={item._id} className='bg-[#e7fffb] px-5 flex justify-between py-3 w-11/12 mx-auto rounded-md'>
                <div className='flex flex-col'>
                  <div className='text-xs md:text-sm'>Username: <span className='text-xs md:text-lg'>{item.name}</span></div>
                  <div className='text-xs md:text-sm'>user email: <span className='text-xs md:text-lg'>{item.email}</span></div>
                  <div className='text-xs md:text-sm'>User role : <span className='text-xs md:text-lg'>{item.role}</span></div> 
                </div>  

                <button onClick={()=>deleteModalHandler(item._id)} className='p-3 h-fit  w-fit  flex rounded-full bg-red-500  justify-center items-center hover:translate-y-1 duration-500 transition-all'>
                  <MdDelete className='text-white text-xl'/>
                </button>           
            </div>
          ))
        }
        </div>
      )
    }

    {
      (deleteModal===true) && <Modal open={deleteModal} onCancel={()=>setDeleteModal(false)} footer={null} style={{top:20}}>
        <div className='p-5 mt-8'>
          <div className='text-lg font-semibold'>Are you sure?</div>
          <div>This action can not be reversed</div>

          <button onClick={deleteHandler} className='mt-3 place-self-start px-4 py-2 rounded-md bg-red-500 text-white font-semibold '> 
            Delete Profile
          </button>

        </div>
      </Modal>
    }
    </div>
  )
}

export default ManageProfiles