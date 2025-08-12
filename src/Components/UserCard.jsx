
import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import dummyProfileImage from "../assets/image.png";
import { useDispatch } from "react-redux";
import Container from "./Container";
import { IoPersonAdd, IoClose } from "react-icons/io5";


const UserCard = ({ userData, handleSendRequest }) => {
  //  console.log(sendRequest);
  if (!userData || userData.length === 0) return; // setError("No request found");
  const { _id, firstName, lastName, photoUrl, age, gender, about, profession } =
    userData;

  const dispatch = useDispatch();

  return (
    <Container className="h-full">
      <div className="flex flex-col items-center justify-between relative py-12  h-full ">
        {/* Card */}
        <div className="w-[330px] h-[550px] rounded-3xl overflow-hidden shadow-lg relative">
          {/* Image */}
          <img
            src={photoUrl || dummyProfileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>

          {/* Info Section */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xl font-bold">
              {firstName}
              <span className="text-white text-lg">{age}</span>
              <FaCheckCircle className="text-blue-500" />
            </div>
            <p className="text-sm opacity-90">🎯 {profession}</p>
            <p className="text-sm opacity-70">{about}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 ">
          <button
            className="flex items-center justify-center gap-3 border border-red-500 text-red-500 font-semibold py-2 rounded-full shadow w-[130px]"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            <IoClose /> Ignore
          </button>

          <button
            className="flex items-center justify-center gap-3 border border-green-500 text-green-500 font-semibold py-2 rounded-full shadow w-[130px]"
            onClick={() => handleSendRequest("interested", _id)}
          >
            <IoPersonAdd /> Connect
          </button>
        </div>
      </div>
    </Container>
  );
};

export default UserCard;
