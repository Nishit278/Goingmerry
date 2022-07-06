import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    firstname: undefined,
    lastname: undefined,
    username: undefined,
    email: undefined,
    mobile: undefined,
    password: undefined,
  });
  const [registered, setRegistered] = useState(false);
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    seterror("");
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    //   console.log(credentials)
    try {
      const res = await axios.post("/api/auth/register", credentials);
      // console.log(res.data)
      setRegistered(true);
      setCredentials({});
    } catch (err) {
      seterror(err.message);
      // console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h1 className="title">Register</h1>
        <div className="name">
          <input
            id="firstname"
            type="text"
            className="fName"
            placeholder="First Name"
            onChange={handleChange}
          />
          <input
            id="lastname"
            type="text"
            className="lName"
            placeholder="Last Name"
            onChange={handleChange}
          />
        </div>
        <div className="others">
          <input
            id="username"
            type="text"
            className="username"
            placeholder="Username"
            onChange={handleChange}
          />
          <input
            id="email"
            type="email"
            className="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            id="mobile"
            type="tel"
            className="number"
            placeholder="Mobile No."
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            className="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button className="submitBtn" onClick={handleClick}>
          Sign Up
        </button>
        <span>
          Already a member?
          <Link className="loginLink" to="/login">
            {" "}
            Login
          </Link>
        </span>
        {error && <span className="rError">{error}</span>}
        {registered && (
          <span className="rSuccess">
            You have been registered! Log In to continue {navigate("/login")}
          </span>
        )}
      </div>
    </div>
  );
};

export default Register;
