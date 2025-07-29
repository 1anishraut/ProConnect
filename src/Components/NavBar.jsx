import React, { useState } from "react";
import Container from "../Components/Container";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constance";
import { removeUser } from "../utils/userSlice";
import dummyProfileImage from "../assets/image.png";
import { resetFeed } from "../utils/feedSlice";


const NavBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((store) => store.user);
  // console.log(user);
  

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(resetFeed())
      dispatch(removeUser())
      return navigate("/login")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Container>
        <div className="navbar bg-base-300 shadow-sm ">
          <div className="flex-1">
            <Link to="/" className="btn btn-ghost text-xl">
              ProConnect
            </Link>
          </div>
          <div className="flex gap-2">
            {/* <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            /> */}
            {user && (
              <div className="dropdown dropdown-end flex  gap-2">
                <p>Welcome, {user.firstName}</p>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="user profile"
                      src={user.photoUrl || dummyProfileImage}
                    />
                  </div>
                </div>
                <ul
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
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default NavBar;
