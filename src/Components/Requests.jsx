import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
    const [error, setError]= useState("")
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
//   console.log(requests);

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
    <div>
      <div>
        Connections
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <div key={request.fromUserId._id} className="border m-4">
              <img
                src={request.fromUserId.photoUrl}
                alt=""
                className="w-[150px]"
              />
              <h1>{request.fromUserId.firstName}</h1>
              <p>{request.fromUserId.profession}</p>

              <div className="flex gap-6">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-full shadow w-[130px]"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Ignore
                </button>
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-full shadow w-[130px]"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>{error || "Loading..."}</p>
        )}
        {/* <h1>{error}</h1> */}
      </div>
    </div>
  );
};

export default Requests;
