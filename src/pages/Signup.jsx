import React, { useState } from "react";
import bg from "../images/bg.jpg";
import netflix from "../images/netflix.png";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUp } = UserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorEmail("");
    setErrorPassword("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (e) {
      console.log(e.message);
      switch (e.code) {
        default:
          setErrorEmail("Enter your email.");
          setErrorPassword("Enter your password.");
          break;
        case "auth/invalid-email":
          setErrorEmail("Not a valid email address.");
          break;
        case "auth/weak-password":
          setErrorPassword("Password should be at least 6 characters.");
          break;
        case "auth/missing-password":
          setErrorPassword("Enter your password.");
          break;
        case "auth/email-already-in-use":
          setErrorEmail("This email has been used.");
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
      <div className="max-w-[450px] h-[500px] mx-auto bg-black/75 z-50 text-white rounded">
        <div className="max-w-[320px] mx-auto py-16">
          <h1 className="text-3xl font-bold">Sign Up</h1>
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
              Sign Up
            </button>
            <p className="py-4 text-base">
              <span className="text-[#737373] mr-2">
                Already have a netflix account?
              </span>
              <Link className="hover:underline" to="/signin">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
