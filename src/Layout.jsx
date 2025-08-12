import React, { useEffect } from "react";
import NavBar from "./Components/NavBar";
import { Navigate, Outlet, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "./utils/userSlice";
import Header from "./Components/Header";
import bgImage from "./assets/v983-054.jpg";
import bgImage2 from "./assets/bgBlack.jpg";


const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

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
  }, []);

  return (
    <div
      style={{ backgroundImage: `url(${bgImage2})` }}
      className="h-screen relative flex flex-col justify-between bg-cover bg-center"
    >
      <div
        style={
          {
            // backdropFilter: "blur(3.5px)",
            // WebkitBackdropFilter: "blur(5.5px)",
          }
        }
        className="h-[10%]"
      >
        <Header />
      </div>

      <div
        style={
          {
            // backdropFilter: "blur(8.5px)",
            // WebkitBackdropFilter: "blur(5.5px)",
          }
        }
        className="glass-card flex-1 overflow-y-scroll border m-4"
      >
        <Outlet />
      </div>

      <div className="relative h-[10%]">
        <NavBar />
      </div>
    </div>
  );
};

export default Layout;
