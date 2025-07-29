import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constance";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  const defaultUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s";
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Sync local state with redux userData
  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setAge(userData.age || "");
      setGender(userData.gender || "");
      setPhotoUrl(userData.photoUrl || defaultUrl);
      setAbout(userData.about || "");
      setEmailId(userData.emailId || "");
    }
  }, [userData]);

  const handleEditProfile = async () => {
     
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl: photoUrl || defaultUrl,
          age,
          gender,
          about,
          emailId,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res?.data?.data));
      navigate("/"); 
      window.location.reload();
      console.log(userData);
      
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };


  const updatedUserData = {
    firstName,
    lastName,
    age,
    gender,
    photoUrl,
    about,
    emailId,
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div
        
          className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center text-black">
            Edit Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <input
            name="emailId"
            type="email"
            placeholder="Email"
            className="input"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="age"
              type="number"
              placeholder="Age"
              className="input"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />

            <select
              name="gender"
              className="input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <input
            name="photoUrl"
            type="text"
            placeholder="Photo URL"
            className="input"
            // value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <textarea
            name="about"
            placeholder="About You"
            className="input"
            rows="3"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          {error && <p className="text-red-500">{error}</p>}

          <button
            
            onClick={handleEditProfile}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Save Profile
          </button>
        </div>

        {/*  Live preview */}
        <UserCard userData={updatedUserData} />
      </div>
    </>
  );
};

export default EditProfile;


//  emailId,
//  skills: skills.split(",").map((s) => s.trim()),
//  profession,