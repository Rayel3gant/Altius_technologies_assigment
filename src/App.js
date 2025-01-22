import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CreateTicket from './components/dashboard/CreateTicket'
import TicketList from './components/dashboard/TicketList'
import AllTickets1 from './components/dashboard/AllTickets1'
import AllTickets2 from './components/dashboard/AllTickets2'
import CreateProfile from './components/dashboard/CreateProfile'
import Logout from './components/dashboard/Logout'
import ManageProfiles from './components/dashboard/ManageProfiles'

const App = () => {
  return (
    <div className='myBg'>
      {/* navbar  */}
      <div className='flex flex-col py-1  text-lg lg:text-3xl font-bold  text-white uppercase text-center navbar tracking-widest hover:tracking-[0.3rem] duration-200 transition-all '>
        <div>ticket</div>
        <div className='flex  justify-center'>
          <div>M</div>
          <div>a</div>
          <div>n</div>
          <div className=' animate-pulse'>a</div>
          <div>g</div>
          <div>e</div>
          <div>r</div>
        </div>

        <div className='w-full h-[2px] bg-white mt-3'/>
      </div>

      <Routes>
        <Route path='/' element={<Home/>} />
        
        <Route  element={<Dashboard/>}>
          <Route path='/dashboard/createTicket' element={<CreateTicket/>}/>
          <Route path='/dashboard/ticketsList' element={<TicketList/>} />
          <Route path='/dashboard/allTickets1'  element={<AllTickets1/>}/>
          <Route path='/dashboard/allTickets2' element={<AllTickets2/>} />
          <Route path='/dashboard/createProfile' element={<CreateProfile/>}/>
          <Route path='/dashboard/manageProfiles' element={<ManageProfiles/>} />
          <Route path='/dashboard/logout' element={<Logout/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App