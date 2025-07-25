
import Container from "./Container";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constance";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("User@gmail.com");
  const [password, setPassword] = useState("Raut@2000");
  const dispatch = useDispatch()
  const navigate = useNavigate()
    
  const handleLogin = async (e) => {
      e.preventDefault(); // ✅ Prevent form from reloading
      try {
        const res = await axios.post( BASE_URL + "/login" , {
          emailId,
          password,
        }, {withCredentials: true});
        // console.log(res.data);
        dispatch(addUser(res.data))
        return navigate("/")
      } catch (error) {
        console.log("Login Error:", error.response?.data || error.message);
      }
    };
    

  return (
    <>
      <Container className="flex items-center justify-center h-screen w-full">
        <div className="card bg-base-100 image-full w-96 shadow-sm ">
          <figure>
            <img
              src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <div className="min-h-screen flex items-center justify-center text-white">
              <div className="w-full max-w-sm bg-gray-800 p-8 rounded-lg shadow-lg">
                              <h2 className="text-2xl font-bold text-center mb-2">Sign in </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email */}
                  <div className="relative">
                    <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Email"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Password */}
                  <div className="relative">
                    <FaLock className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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

                  {/* Remember me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="form-checkbox accent-blue-500"
                      />
                      Remember me
                    </label>
                    <a href="#" className="text-blue-400 hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  {/* Login Button */}
                  <button
                    
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
                  >
                    Log in
                  </button>
                </form>

                {/* Signup Link */}
                <p className="text-sm text-center text-gray-400 mt-4">
                  Don’t have an account?{" "}
                  <a href="#" className="text-blue-400 hover:underline">
                    Sign up now
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
