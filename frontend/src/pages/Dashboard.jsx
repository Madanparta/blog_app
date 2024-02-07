import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DarshProfile from '../components/DarshProfile'

const Dashboard = () => {
  const location = useLocation()
  const [tab,setTab]=useState('')
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl){
      setTab(tabFromUrl) 
    }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md-56'>
      {/* sidebar */}
      <DashSidebar/>
      </div>
      {/* profile .. */}
      { tab === 'profile' && <DarshProfile/>}
    </div>
  )
}

export default Dashboard
