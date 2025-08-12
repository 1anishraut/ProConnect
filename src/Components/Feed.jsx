import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  // console.log(feed);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log("API" + res);
      
      dispatch(addFeed(res?.data?.data));
      
    } catch (error) {}
  };

  useEffect(() => {
    getFeed();
  }, [feed]);

  if (!feed || feed.length === 0) {
    getFeed();
  }

  if (!feed) return;

  if (feed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users founds!</h1>;


// const [index, setIndex] = useState(0);

   const handleSendRequest = async (status, userId) => {
     try {
       const res = await axios.post(
         BASE_URL + "/request/send/" + status + "/" + userId,
         {},
         { withCredentials: true }
       );
      //  setIndex((prev) => prev + 1); 
       dispatch(removeFeed(userId));
     } catch (err) {}
   };
 


 

  return (
    <>
      {feed && (
       
          <UserCard userData={feed[0]} handleSendRequest ={handleSendRequest}  />
        
      )}
    </>
  );
};

export default Feed;
