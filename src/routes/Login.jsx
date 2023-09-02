import React, { useState } from "react";
import "./Css/Login.css";
import Footer from "../components/Home/Footer";
import Navbar from "../components/Home/Navbar";
import heroImage7 from "../assests/hero6.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate =useNavigate();
  const [action, setAction] = useState("Sign Up");
  const [values, setValues] = useState({
    name: "",
    role:"reader",
    email: "",
    password: "",
  });
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const [errorMsg,setErrorMsg]=useState("");
  const handleSubmit = async (event) => {
       event.preventDefault();
       axios.post("http://localhost:4000/login",values)
       .then(response =>{
         console.log(response);
         navigate('/user')
       })
       .catch((error) =>{
        console.log(error)
       } );
  }
  return (
    <>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="left">
            <img
              className="background-image"
              src={heroImage7}
              alt="Background"
            />
          </div>
          <div className="right">
            <div className="form-box">
              <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
              </div>
              <div className="inputs">
                <div className="input">
                  <input
                    type="text"
                    placeholder="Username"
                    name="name"
                    onChange={handleInput}
                    required
                  />
                </div>
                {action === "Sign Up" && (
                  <div className="input">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      onChange={handleInput}
                      required
                    />
                  </div>
                )}

                <div className="input">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    onChange={handleInput}
                    required
                  />
                </div>
              </div>
              <div className="submit-container">
                <button
                  className={action === "Login" ? "submit gray" : "submit"}
                  onClick={() => {
                    setAction("Sign Up");
                  }}
                  type="submit"
                >
                  Sign Up
                </button>
                <button
                  className={action === "Sign Up" ? "submit gray" : "submit"}
                  onClick={() => {
                    setAction("Login");
                  }}
                  type="submit"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Footer />
    </>
  );
};

export default Login;
