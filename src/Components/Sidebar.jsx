import React from "react";
import {
  FaHome,
  FaUsers,
  FaBookmark,
  FaPhone,
  FaUserFriends,
  FaCog,
  FaUserPlus,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  IoMdClose,
  IoMdInformationCircleOutline,
  IoIosMail,
} from "react-icons/io";
import { Link } from "react-router-dom";

import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ onClose, user, handleLogOut }) => {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 right-0 h-full w-full text-white z-100 bg-[#000000e1] transition-transform duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside sidebar
        className="w-64 h-full bg-[#5900ED] ml-auto rounded-l-2xl flex  flex-col justify-between"
      >
        <div>
          {/* Close Button */}
          <div className="flex justify-end p-4">
            <button onClick={onClose}>
              <IoMdClose size={28} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={user.photoUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="mt-2 font-semibold">
              {user.firstName} {user.lastName}
            </p>
          </div>

          {/* Navigation Items */}
          <ul className="space-y-4 text-sm pl-6">
            <li className="">
              <Link to="/" className="flex items-center gap-3">
                <FaHome /> Home
              </Link>
            </li>
            <li
            //   onClick={onClose}
            >
              <Link to="/profile" className="flex items-center gap-3">
                <FaUsers /> Edit Profile
              </Link>
            </li>
            <li
            //   onClick={onClose}
            >
              <Link to="/connections" className="flex items-center gap-3">
                <FaUserFriends /> Connections
              </Link>
            </li>
            <li>
              <Link to="/requests " className="flex items-center gap-3">
                <FaUserPlus /> Requests
              </Link>
            </li>

            <li className="flex items-center gap-3 text-gray-500">
              <FaBookmark /> Saved Messages
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              <FaPhone /> Calls
            </li>
            <li className="flex items-center gap-3 text-gray-500">
              <FaCog /> Settings
            </li>
          </ul>
        </div>

        <div className=" h-full flex flex-col justify-end items-center  p-2 ">
          <div className=" flex flex-col  w-full text-2xl  gap-2 p-4  border-b-3 border-gray-400">
            <Link to="" className="flex gap-2 items-center">
              <IoMdInformationCircleOutline />
              About
            </Link>
            <div onClick={handleLogOut} className="flex gap-2 items-center">
              <FiLogOut />
              LogOut
            </div>
          </div>
          <div className="flex gap-4 p-4">
            <FaGithub size={30} />
            <FaLinkedin size={30} />
            <IoIosMail size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
