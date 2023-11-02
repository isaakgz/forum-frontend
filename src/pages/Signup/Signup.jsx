require('dotenv').config()
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { UserContext } from "../../context/UserContext";
import axios from "axios";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const [userData, setUserData] = useContext(UserContext);
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [passwordLengthError, setPasswordLengthError] = useState(false);
  const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setEmptyFieldError(false);
    setPasswordLengthError(false); // Reset password length error
    setEmailAlreadyRegistered(false);
    


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmptyFieldError(false);
    setPasswordLengthError(false);
    setEmailAlreadyRegistered(false);

    if (
      !form.email ||
      !form.firstName ||
      !form.lastName ||
      !form.userName ||
      !form.password
    ) {
      setEmptyFieldError(true);
      setPasswordLengthError(false); // Reset password length error
      setEmailAlreadyRegistered(false); // Reset email already registered error
      return;
    }

    if (form.password.length < 8) {
      setPasswordLengthError(true);
      setEmptyFieldError(false); // Reset empty field error
      setEmailAlreadyRegistered(false); // Reset email already registered error
      return;
    }
    try {
      //sending data to be registered in database
      const response = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users`,
        form
      );

      if (response.data.msg === "An account with this email already exists!") {
        setEmailAlreadyRegistered(true);
        return;
      }

      //once registered the login automatically so send the new user info to be logged in
      const loginRes = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      // set the global state with the new user info
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate to homepage once the user is signed up
      navigate("/");
    } catch (error) {
      // setShowError(true);
      // console.log("problem ==>", error.response.data.msg);
      setEmailAlreadyRegistered(true)
    }
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__form">
          <div className="signup__title">
            <h3>Join the network</h3>
          </div>
          <div className="signup__dicription">
            <p>
              Already have an account?
              <span className="signup__dicription--orange">
                <Link to="/login">Sign In</Link>
              </span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            
            {emptyFieldError && (
              <div className="error-box"><WarningAmberIcon />All fields are required.</div>
            )}
            {passwordLengthError && (
              <div className="error-box">
              <WarningAmberIcon />
                Password must be at least 8 characters.
              </div>
            )}
            {emailAlreadyRegistered && (
              <div className="error-box">
              <WarningAmberIcon />
                An account with this email already exists.
              </div>
            )}
            <div>
              <input
                className="signup__input"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="  Email "
              />
            </div>
            <div className="firstlast_names">
              <input
                className="signup__input firstname"
                type="text"
                name="firstName"
                onChange={handleChange}
                placeholder=" First Name"
              />
              <input
                className="signup__input lastname"
                type="text"
                name="lastName"
                onChange={handleChange}
                placeholder=" last Name"
              />
            </div>
            <div>
              <input
                className="signup__input"
                type="text"
                name="userName"
                onChange={handleChange}
                placeholder="  User Name "
              />
            </div>
            <div className="password-input">
              <input
                id="password"
                className="signup__input"
                type={passwordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder="  Password "
              />
              <div onClick={()=>{
                setPasswordVisible(!passwordVisible)
              }} className="password-visibility-icon">
                {passwordVisible ? (
                  <VisibilityIcon style={{ opacity: "0.5", width: "20px" }} />
                ) : (
                  <VisibilityOffIcon
                    style={{ opacity: "0.5", width: "20px" }}
                  />
                )}
              </div>
            </div>
            <p>
              I agree to the{" "}
              <Link
                style={{
                  color: "#da7000",
                }}
              >
                privacy policy
              </Link>{" "}
              and{" "}
              <Link
                style={{
                  color: "#da7000",
                }}
              >
                terms of service
              </Link>
            </p>
            <button className="signup__btn">Agree and Join</button>
          </form>
          <div className="signup__dicription--orange">
            <Link to="/login">Already have an account</Link>
          </div>
        </div>
        <div className="login__about">
          <p className="about">About</p>
          <div className="about__title">
            <h1>Evangadi Networks Q & A</h1>
          </div>
          <div className="about__Discription">
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <br />
            <p>
              Wheather you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <br />
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>
            <br />
          </div>
          <button>HOW IT WORKS</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;

{
  /* <div>
      <h1>sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>first name: </label>
        <input type="text" name="firstName" onChange={handleChange} />
        <br />
        <label>last name: </label>
        <input type="text" name="lastName" onChange={handleChange} />
        <br />
        <label>user name: </label>
        <input type="text" name="userName" onChange={handleChange} />
        <br />
        <label>Email: </label>
        <input type="email" name="email" onChange={handleChange} />
        <br />
        <label>password: </label>
        <input type="password" name="password" onChange={handleChange} />
        <br />
        <button>submit</button>
      </form>
      <Link to="/login"> already have an account</Link>
    </div> */
}
