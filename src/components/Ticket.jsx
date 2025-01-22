import { Badge, Collapse, Modal } from 'antd';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { PROFILE_ROLE } from "../utils/Constant"
import { FaEdit } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { deleteNote, updateTicket } from '../services/operations';
import Loader from './Loader';
import formatDateTime from '../utils/dateFormatter';
const { Panel } =Collapse;


const PanelHeader=()=>(
  <div>
    <div className='text-lg'>Update Ticket</div>
    <div className='w-full h-[0.5px] bg-black mt-2'/>
  </div>
)


const Ticket = ({ticket, setTicketUpdate}) => {
  const {register , handleSubmit , formState:{errors}} =useForm()
  const status="Closed";
  const { userData , loading} =useSelector((state)=>state.auth)
  const dispatch=useDispatch()

  const [newNoteModal,setNewNoteModal]=useState(false)
  const [updateNoteModal,setUpdateNoteModal]=useState(false)
  const [newTicketStatus,setNewTicketStatus]=useState(null)
  const [note,setNote]=useState('')
  const [noteId,setNoteId]=useState(null)

  const submitHandler1=(data)=>{
    console.log(data)
    const newData={
      ...data,
      name:userData.name,
      ticketId:ticket._id
    }

    updateTicket(newData,userData.token,userData.role, dispatch)
    setTimeout(()=>{
      setTicketUpdate(true)
    },200)  
  }

  const submitHandler2=(data)=>{
    console.log(data)
    const newData={
      ...data,
      noteId:noteId,
      ticketId:ticket._id
    }
    if(newTicketStatus){
      newData.status=newTicketStatus
    }

    updateTicket(newData, userData.token, userData.role, dispatch)
    setTimeout(()=>{
      console.log("ticket updated ")
      setTicketUpdate(true)
    },200) 
  }

  const updateModalHandler=(data)=>{
    setUpdateNoteModal(true)
    console.log(data)
    setNote(data.description)
    setNoteId(data._id)
  }


  const deleteNoteHandler=()=>{
    const data={
      noteId:noteId , 
      ticketId:ticket._id
    }
    deleteNote(data, userData.token, dispatch)
    setTimeout(()=>{
      console.log("ticket updated ")
      setTicketUpdate(true)
    },200) 
  }
  return (
    <div className='w-11/12 mx-auto'>
    
      <Badge.Ribbon text={ticket.status} className={ `text-sm px-3 py-1 ${(ticket.status==="Active") && "bg-green-500"} ${(ticket.status==="Pending") && "bg-yellow-500"} ${(ticket.status==="Closed") && "bg-red-500"}`}>
        <div className='bg-white px-5  py-3 rounded-md myText'>
          <div className='text-xl font-semibold text-blue-700 uppercase'>{ticket.title}</div>
          <div className='w-full h-[0.5px] bg-black mt-2'/>
          
          <div className='flex flex-col gap-y-2 pt-4'>
            <div className='text-sm text-[#6c757d] '>Ticket Id : <span className='text-sm md:text-lg '>{ticket._id}</span></div>
            <div className='text-sm text-[#6c757d] '>Added by: <span className='text-sm md:text-lg'>{ticket.customerId.name}</span></div>

            <div className='text-sm text-[#6c757d] '>Last updated : 
              <span className='text-sm md:text-lg'> {formatDateTime(ticket.lastUpdated)}</span>
            </div>
          </div>

          <div className='w-full '>

            <Collapse
              defaultActiveKey={['1']}
              expandIconPosition='end'
              className='bg-[#e7fffb] mt-2'
              bordered={false}
              expandIcon={({ isActive }) => (
              <IoIosArrowUp
                className='fs-4  collapseArrow'
                style={{
                  transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
                />
              )}              
            >
              <Panel header={<PanelHeader/>} key="1" className='w-full' >
                  <div className='w-100'>
                    <div className='text-sm'>Ticket notes : </div>
                    <div className='flex flex-col gap-y-2 mt-2'>
                      {
                        ticket.notes.map((item)=>(
                          <div className='flex w-full px-3 justify-between items-center'>
                            <div>{item.description}</div>

                            <button onClick={()=>updateModalHandler(item)}>
                              <FaEdit/>
                            </button>
                          </div>
                        ))
                      }
                    </div>

                    <button onClick={()=>setNewNoteModal(true)}  className='mt-3 place-self-start px-4 py-2 rounded-md bg-[#1E90FF] text-white font-semibold '>
                      + Create New Note
                    </button>
                  </div>
              </Panel>

            </Collapse>
          </div>
        </div>
      </Badge.Ribbon>
      
      {
        (newNoteModal === true) && <Modal open={newNoteModal} onCancel={()=>setNewNoteModal(false)} style={{top:20}} footer={null}>
          <div className='p-5 mt-6'>
            <form onSubmit={handleSubmit(submitHandler1)} className=''>
              <div className='flex flex-col'>
                <label htmlFor='noteDesc' className='text-xs'>Note Description</label>
                <input type='text' id='noteDesc' name='noteDesc' placeholder='enter note description' className='w-100 formInput' {...register('noteDesc',{required:true})}/>
                {
                  errors.noteDesc && <span className='text-xs text-red-500'>please enter note description</span>
                }
              </div>

              {
                (loading===true) ? (
                  <div className='w-full py-5 h-fit flex justify-center items-center'>
                    <Loader/>
                  </div>
                ) :(
                  <button type='submit' className='mt-3 place-self-start px-4 py-2 rounded-md bg-[#1E90FF] text-white font-semibold '>
                    Add New Note
                  </button>
                )
              }
            </form>
          </div>
        </Modal>
      }

      {
        (updateNoteModal === true) && <Modal open={updateNoteModal} onCancel={()=>setUpdateNoteModal(false)} style={{top:20}} footer={null}>
          <div className='p-5 mt-6'>
            <form onSubmit={handleSubmit(submitHandler2)} className='flex flex-col gap-y-4'>
              <div className='flex flex-col'>
                <label htmlFor='noteDesc' className='text-xs'>Note Description</label>
                <input type='text' id='noteDesc' name='noteDesc' defaultValue={note}   placeholder='enter note description' className='w-100 formInput' {...register('noteDesc',{required:true})}/>
                {
                  errors.noteDesc && <span className='text-xs text-red-500'>please enter note description</span>
                }
              </div>
                
              <div>
                <label htmlFor='noteDesc' className='text-xs'>Ticket Status (optional) : </label>
                <div className={`flex items-center gap-x-3 mt-1 ${(userData.role===PROFILE_ROLE.CUSTOMER) && "pointer-events-none"}`}>
                  {
                    ["Active","Pending","Closed"].map((item)=>(
                      <label onClick={()=>setNewTicketStatus(item)} className={`cursor-pointer px-3 py-2 rounded-md w-fit transition-all font-semibold  duration-500 ${(newTicketStatus===item)?"bg-yellow-400 text-black":"bg-white text-black border"}`}>
                        <input type='radio' name='status' id='' value={item} className="hidden" {...register('status')}/>
                          {item}
                      </label>                     
                    ))
                  }             
                </div>
              </div>
              

              <button type='submit' className='mt-3 place-self-start px-4 py-2 rounded-md bg-[#1E90FF] text-white font-semibold '>
                Update Note
              </button>

              {
                (userData.role===PROFILE_ROLE.ADMIN) &&  
                  <button onClick={deleteNoteHandler} className='mt-3 place-self-start px-4 py-2 rounded-md bg-red-500 text-white font-semibold  '>
                    Delete Note
                  </button>
              }
            </form>
          </div>
        </Modal>
      }
    </div>

  )
}

export default Ticket