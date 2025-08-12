import React from 'react'
import Container from './Container'
import { Link } from 'react-router-dom'
import { RiNotification4Fill } from "react-icons/ri";

const Header = () => {
  return (
    <Container className="h-full min-w-[400px] flex relative text-white">
      {/* Background bar */}
      {/* <div className="absolute bg-[#5d17cc] h-[40px] w-full z-[-1]" /> */}

      {/* ProConnect container takes all available space */}
      <Link to="/" className="flex-1">
        <div className="h-full   rounded-tr-4xl flex items-center px-4 text-2xl font-semibold">
          ProConnect
        </div>
      </Link>

      {/* Bell icon with fixed width */}
      <Link to="/requests">
        <div className="bg-[#5d17cc] text-white h-full w-20 flex items-center justify-center rounded-bl-4xl">
          <RiNotification4Fill size={30} />
        </div>
      </Link>
    </Container>
  );
}

export default Header