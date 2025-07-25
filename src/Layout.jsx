import React from 'react'
import NavBar from './Components/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <Outlet />
    </div>
  );
}

export default Layout