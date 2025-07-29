import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";




const Layout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((store)=> store.user)


  const fetchUser = async () => {
    if (userData) return
    
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      // console.log(res);
      
      dispatch(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      // console.log(error);
      
    }
  };
  useEffect(() => {
  
      fetchUser();
    
  },[])

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>
      <div className="pt-[60px] relative h-screen bg-slate-800">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
