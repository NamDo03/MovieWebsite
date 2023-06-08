import React, { useState } from "react";
import bg from "../images/bg.jpg";
import netflix from "../images/netflix.png";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    try {
      await signIn(email, password);
      navigate("/");
    } catch (e) {
      console.log(e.message);
      switch (e.code) {
        default:
          setErrorPassword("Invalid email/password combination.");
          break;
        case "auth/invalid-email":
          setErrorEmail("Please enter a valid email.");
          setErrorPassword("Your password must contain between 6 and 60 characters.");
          break;
        case "auth/user-not-found":
          setErrorEmail("User not found.");
          break;
        case "auth/missing-password":
          setErrorPassword("Enter password.");
          break;
        case "auth/wrong-password":
          setErrorPassword("Invalid email/password combination.");
          break;
      }
    }
  };
  return (
    <div
      className="w-full h-screen bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="p-5 w-full h-[80px]">
        <img className="h-full object-cover" src={netflix} alt="logo" />
      </div>
      <div className="max-w-[450px] h-[500px] mx-auto bg-black/75 z-50 text-white">
        <div className="max-w-[320px] mx-auto py-16">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <form onSubmit={handleSubmit} className="flex flex-col w-full py-4">
            <div className="relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-lg px-5 pt-5 pb-2 my-2 bg-[#333] rounded focus:bg-[#454545] outline-none invalid:border-b-[#e87c03] invalid:border-b-2 peer placeholder-transparent"
                type="text"
                placeholder="email"
                id="email"
              />
              <label
                htmlFor="email"
                className="text-sm text-[#8c8c8c] absolute top-3 left-5 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-7 peer-focus:top-3 peer-focus:text-sm"
              >
                Email
              </label>
              <p className="text-[#e87c03] text-sm">{errorEmail}</p>
            </div>
            <div className="relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-lg px-5 pt-5 pb-2 my-2 bg-[#333] rounded focus:bg-[#454545] outline-none invalid:border-b-[#e87c03] invalid:border-b-2 peer placeholder-transparent"
                type="password"
                placeholder="password"
                id="password"
              />
              <label
                htmlFor="password"
                className="text-sm text-[#8c8c8c] absolute top-3 left-5 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-7 peer-focus:top-3 peer-focus:text-sm"
              >
                Password
              </label>
              <p className="text-[#e87c03] text-sm">{errorPassword}</p>
            </div>
            <button className="bg-red-600 py-3 my-6 rounded font-bold">
              Sign In
            </button>
            <div className="flex justify-between items-center text-sm text-[#b3b3b3]">
              <p className="flex justify-center items-center">
                <input className="mr-2" type="checkbox" />
                Remember me
              </p>
              <p className="hover:underline cursor-pointer">Need help</p>
            </div>
            <p className="py-4 text-base">
              <span className="text-[#737373] mr-2">New to Netflix?</span>
              <Link className="hover:underline" to="/signup">
                Sign up now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
