import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, matchPath, Outlet, useLocation } from 'react-router-dom'
import { sidebarLinks } from '../data/dashboardLinks';
import { GrFormNextLink } from "react-icons/gr";
import { IoMdLogOut } from "react-icons/io";


const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { userData} =useSelector((state)=>state.auth)

  const location=useLocation()

    const matchRoute= (route) =>{
        return matchPath({path:route}, location.pathname)
    }   


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    
    <div className='w-full min-h-[calc(100vh-5rem)] max-h-full overflow-y-hidden flex '> 
      {/* sidebar */}
      
      <div
        className={`${isOpen ? 'w-64' : 'w-20'} bg-gray-800 min-h-[calc(100vh-5rem)] text-white transition-width duration-300 `}>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-lg font-bold ${!isOpen && 'hidden'}`}>Dashboard</h1>
          <button onClick={toggleSidebar}
            className="text-gray-400 hover:text-white">
            {isOpen ? '<' : '>'}
          </button>
        </div>

        <div className='mt-4'>
        {
          sidebarLinks.map((item)=>(
            <>
              {
                (item.type === userData?.role) && 
                <Link to={item.path} key={item.id} className={`p-4 flex items-center ${(matchRoute(item.path)?"bg-gray-700":"")}`}>
                  <GrFormNextLink className={`text-xl ${matchRoute(item.path) ? 'text-yellow-400' : ''}`} />
                  <div className={`${!isOpen && 'hidden'} ml-2 ${(matchRoute(item.path)?"text-yellow-400":"")} `}>{item.name}</div>
                </Link>
              }
            </>
          ))
        }

        <Link to={"/dashboard/logout"}  className="p-4  flex items-center hover:bg-gray-700">
          <IoMdLogOut className='text-xl'/>
          <div className={`${!isOpen && 'hidden'} ml-2`}>Log out</div>
        </Link>

        </div>
      </div>


      <div className='w-11/12 max-w-[900px] mx-auto overflow-auto'>
        <div className='mx-auto py-10'>
            <Outlet/>
        </div>
      </div>


    </div>

  )
}

export default Dashboard

 