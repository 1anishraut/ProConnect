import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";
import Container from "./Container";
import dummyProfileImage from "../assets/image.png";
import { IoPersonAdd, IoClose } from "react-icons/io5";


const Requests = () => {
    const [error, setError]= useState("")
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  // console.log(requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (error) {}
  };

  const reviewRequest = async (status, _id) => {
    try {
        const res = await axios.post(
          BASE_URL + "/request/review/" + status + "/" + _id,
          {},
          { withCredentials: true }
        );
        fetchRequest();
    } catch (error) {
        
    }
    };
    

  useEffect(() => {
    fetchRequest();
  }, []);
    
    useEffect(() => {
      if (!requests || requests.length === 0) {
        setError("No request found");
      } else {
        setError("");
      }
    }, [requests]);


  return (
    <Container>
      <div className="overflow-y-auto max-h-full">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
              key={request.fromUserId._id}
              className=" m-4 flex justify-between items-center p-2"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={request.fromUserId.photoUrl || dummyProfileImage}
                  alt="profile image"
                  className=" object-cover w-full h-full rounded-full"
                />
              </div>

              <div>
                <h1 className="text-[17px] font-semibold">
                  {request.fromUserId.firstName} {request.fromUserId.lasttName}
                </h1>
                <p className="">{request.fromUserId.profession}</p>
              </div>

              <div className="flex gap-3">
                <button
                  className="border text-red-600 rounded-full shadow w-[50px] h-[50px] flex items-center justify-center"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  <IoClose />
                </button>
                <button
                  className="border text-blue-600 rounded-full shadow w-[50px] h-[50px] flex items-center justify-center"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  <IoPersonAdd />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className=" m-4 p-2 ">{error || "Loading..."}</p>
        )}
        {/* <h1>{error}</h1> */}
      </div>
    </Container>
  );
};

export default Requests;
