import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader'
import Ticket from '../Ticket'
import { getAllCustomerTickets } from '../../services/operations'

const TicketList = () => {
  const { loading , userData  } =useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const [ticketUpdate,setTicketUpdate]=useState(false)
  const [ticketList,setTicketList]=useState([])

  const fetchTickets = async () => {
    console.log("here")
    try {
      const result = await getAllCustomerTickets(userData.token,dispatch);
      if(result){
        setTicketList(result)
      }
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };
  console.log("tickets",ticketList)

  useEffect(()=>{
    fetchTickets()
  },[])
  // if ticket updates , fetch data again
  useEffect(()=>{
    if(ticketUpdate){
      fetchTickets()
      setTicketUpdate(false)
    }
  },[ticketUpdate])

  return (
    <div>
      {
        (loading===true) ? (
          <div className='w-full h-[calc(100vh-5rem)] flex justify-center items-center'>
            <Loader/>
          </div>
        ) : (

            <div>
              <div className='mt-5'>
              {
                (ticketList.length===0)?(
                  <div>
                    no tickets found!!!
                  </div>
                ) : (
                  <div className='flex flex-col gap-y-4'>
                    {
                      ticketList.map((item)=>(
                        <Ticket key={item._id} setTicketUpdate={setTicketUpdate}  ticket={item}/>
                      ))
                    }
                  </div>
                )
              }
              </div>

            </div>
           

        )
      }
    </div>
  )
}

export default TicketList