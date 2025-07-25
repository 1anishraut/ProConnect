import React from "react";
import Container from "../Components/Container";
import { useSelector } from "react-redux";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <>
      <Container>
        <div className="navbar bg-base-100 shadow-sm ">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">ProConnect</a>
          </div>
          <div className="flex gap-2">
            {/* <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-auto"
            /> */}
            {user && (
              <div className="dropdown dropdown-end flex  gap-2">
                <p>Welcome, { user.firstName}</p>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img alt="user profile" src={user.photoUrl} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
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
