import React, { useState } from "react";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import dummyProfileImage from "../assets/image.png";
import { resetFeed } from "../utils/feedSlice";
import { div } from "framer-motion/client";
import { RiHome9Fill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import Sidebar from "../Components/Sidebar";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  // console.log(user);

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(resetFeed());
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
                // backdropFilter: "blur(5.5px)",
        // WebkitBackdropFilter: "blur(5.5px)",
        
              }}
      className="h-full w-full">
      {user && (
        <>
          <Container className="h-full bg-[#5900ED] flex items-center justify-between relative px-6 rounded-tl-4xl rounded-tr-4xl ">
            {/* CONNECTIONS  */}
            <Link to="/connections">
              <div className="text-white">
                <FaUserFriends size={34} />
              </div>
            </Link>

            {/* FEED */}
            <Link to="/">
              <div className="text-white border h-16 w-16 flex items-center justify-center rounded-full bg-[#5d17cc]">
                <RiHome9Fill size={34} />
              </div>
            </Link>

            {/* PROFILE */}
            <div
              onClick={() => setIsSidebarOpen(true)}
              className="w-10 h-10 rounded-full border-2  border-[#ffffff] relative overflow-hidden"
            >
              <img
                alt="user profile"
                src={user.photoUrl || dummyProfileImage}
                className="w-10 h-10 object-cover rounded-full"
              />
            </div>

            {/* Sidebar */}
            {isSidebarOpen && (
              <Sidebar
                user={user}
                handleLogOut={handleLogOut}
                onClose={() => setIsSidebarOpen(false)}
              />
            )}
          </Container>
        </>
      )}
    </div>
  );
};

export default NavBar;

{
  /* <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      <li>
        <Link to="/profile" className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li>
        <Link to="/connections">Connections</Link>
      </li>
      <li>
        <Link to="/requests">Requests</Link>
      </li>
      <li>
        <Link onClick={handleLogOut}>Logout</Link>
      </li>
    </ul> */
}
