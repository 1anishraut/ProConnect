import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import Container from "./Container";
import dummyProfileImage from "../assets/image.png";
import {
  IoMdMale,
  IoMdFemale,
  IoIosMail,
  IoLogoWhatsapp,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdLaptopMac } from "react-icons/md";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoChatbubbleEllipses } from "react-icons/io5";

import { div } from "framer-motion/client";
import { Link } from "react-router-dom";

const Connections = () => {
  const [expandedIds, setExpandedIds] = useState([]);

  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  // console.log(connections);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        dispatch(addConnections(res?.data?.data));
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, [dispatch]);

  if (!connections || connections.length === 0) return null;

  const toggleSection = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Container className=" flex flex-col relative h-full">
      <div className="overflow-y-auto max-h-full">
        {connections.map((connection) => {
          const isExpanded = expandedIds.includes(connection._id);

          return (
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              key={connection._id}
              className="border border-[#5D17CC] rounded-md  m-4 transition-all duration-300"
            >
              <section className="flex  items-start ">
                {/* Profile Image */}
                <div
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                  className={`${
                    isExpanded
                      ? "w-26 h-32 rounded-xl border-none"
                      : "w-16 h-16 rounded-full"
                  }  border relative overflow-hidden transition-all duration-300 m-2 `}
                >
                  <img
                    alt="user profile"
                    src={connection.photoUrl || dummyProfileImage}
                    className={`${
                      isExpanded
                        ? "w-26 h-32 rounded-xl"
                        : "w-16 h-16 rounded-full"
                    }  object-cover w-full h-full rounded-full `}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 m-2">
                  <h1 className="text-[20px] font-bold flex gap-2">
                    {connection.firstName}

                    {isExpanded && connection.lastName
                      ? ` ${connection.lastName}`
                      : ""}
                  </h1>

                  {/* Age & Gender */}
                  {isExpanded && (
                    <div className="flex items-center gap-4 text-[17px] font-semibold mt-1">
                      <p>{connection.age}</p>
                      {connection.gender === "male" && (
                        <IoMdMale className="text-blue-500" />
                      )}
                      {connection.gender === "female" && (
                        <IoMdFemale className="text-pink-500" />
                      )}
                    </div>
                  )}

                  <p className="text-[17px] font-semibold flex gap-2 items-center">
                    <MdLaptopMac /> {connection.profession}
                  </p>
                  {isExpanded && (
                    <div className="text-[17px] font-semibold flex gap-2 items-center ">
                      <HiOutlineOfficeBuilding />
                      {connection.company}
                    </div>
                  )}
                </div>

                {/* CHAT  */}
                <Link to={"/chat/" + connection._id}>
                  <div className=" m-3 self-center ">
                    <IoChatbubbleEllipses size={28} />
                  </div>
                </Link>

                {/* Toggle Button */}
                <button
                  className=" p-1 rounded-bl-md text-sm bg-[#5D17CC] text-white"
                  onClick={() => toggleSection(connection._id)}
                >
                  {isExpanded ? (
                    <IoIosArrowDown size={24} />
                  ) : (
                    <IoIosArrowForward size={24} />
                  )}
                </button>
              </section>

              {/* Hidden Section */}
              {isExpanded && (
                <section className="mt-4 px-4 text-sm space-y-2 mb-4">
                  <p className="text-[17px] text-justify ">
                    {connection.about}
                  </p>
                  <div
                    style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                    className="flex gap-4 justify-between px-4 text-xl  bg-[#5c17ccd0]  rounded-4xl py-2"
                  >
                    <FaGithub size={30} />
                    <FaLinkedin size={30} />
                    <IoIosMail size={30} />
                    <IoLogoWhatsapp size={30} />
                  </div>
                </section>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Connections;
