import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import { FaCheckCircle } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
import { span } from "framer-motion/client";

const EditProfile = () => {
  const userData = useSelector((store) => store.user);
  const defaultUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCpY5LtQ47cqncKMYWucFP41NtJvXU06-tnQ&s";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [about, setAbout] = useState("");
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    } catch (error) {
      setError(error?.response?.data );
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
    <Container className=" h-full">
      <div className="m-4 flex flex-col gap-4 text-2xl  ">
        <div className="flex items-center justify-between  relative ">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input w-[160px]"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input w-[160px]"
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
            className="input relative"
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
        <div className=" relative"></div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex w-full justify-between gap-4">
          <button
            className="w-1/2 rounded-full border px-6 py-2 border-blue-500"
            onClick={() => setShowPreview((prev) => !prev)}
          >
            {showPreview ? (
              "Hide"
            ) : (
              <span className="flex gap-2 items-center">
                <VscPreview /> Preview
              </span>
            )}
          </button>
          <button
            onClick={handleEditProfile}
            className="w-1/2 rounded-full border px-6 py-2 flex gap-2 items-center justify-center border-green-500 "
          >
            <MdSaveAlt /> Save
          </button>
        </div>

        {showPreview && (
          // USER Card
          <div className="w-full flex items-center justify-center">
            <div className=" w-[80%] overflow-hidden rounded-3xl  shadow-lg relative">
              {/* Image */}
              <img
                src={photoUrl || dummyProfileImage}
                alt="Profile"
                className=" h-full w-full object-cover"
              />

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>

              {/* Info Section */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-xl font-bold">
                  {userData.firstName}
                  <span className="text-white text-lg">{userData.age}</span>
                  <FaCheckCircle className="text-blue-500" />
                </div>
                <p className="text-sm opacity-90">🎯 {userData.profession}</p>
                <p className="text-sm opacity-70">{userData.about}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default EditProfile;

//  emailId,
//  skills: skills.split(",").map((s) => s.trim()),
//  profession,
