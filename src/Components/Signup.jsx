import React, { useState } from "react";
import Container from "./Container";
import axios from "axios";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BASE_URL } from "../utils/constance";
import { useNavigate, Link, Links } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
     const res= await axios.post(BASE_URL + "/signup", formData, {
        withCredentials: true,
      });
        dispatch(addUser(res?.data?.data))
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data || "Signup failed");
    }
  };

  return (
    <Container className="flex items-center justify-center h-screen w-full">
      <div className="card bg-base-100 image-full w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Sign up"
          />
        </figure>
        <div className="card-body">
          <div className="min-h-screen flex items-center justify-center text-white">
            <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-2">Sign up</h2>

              <form onSubmit={handleSignup} className="space-y-4">
                {/* First Name */}
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Last Name */}
                <div className="relative">
                  <FaUser className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type="email"
                    name="emailId"
                    placeholder="Email"
                    value={formData.emailId}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <FaLock className="absolute top-3 left-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-10 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-2.5 right-3 text-gray-400"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                </div>

                {/* Error */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Signup Button */}
                {/* <Link to="/profile"> */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  >
                    Sign Up
                  </button>
                {/* </Link> */}
              </form>

              {/* Login Link */}
              <p className="text-sm text-center text-gray-400 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
