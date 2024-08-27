import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  const [first, setfirst] = useState()
  useEffect(() => { }, [])

  return <>
    <Navbar />
    <div className=' container mx-auto my-16 py-16 '>
      <Outlet></Outlet></div>
  </>
}
