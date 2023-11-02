require('dotenv').config()
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import axios from "axios";
import "./Login.css";
import Visibility from "@mui/icons-material/Visibility";

function Login() {
  const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [showErorr, setShowErorr] = useState(false);
  const [notUser, setNotUser] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setShowErorr(false);
    setNotUser(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //sending user data to database to be logged in
      const loginRes = await axios.post(
        `${process.env.REACT_APP_base_url}/api/users/login`,
        {
          email: form.email,
          password: form.password,
        }
      );

      //update global state with response from backend(user-info)
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });

      //set localStorage with the token
      localStorage.setItem("auth-token", loginRes.data.token);

      //navigate user to homepage
      navigate("/");
    } catch (err) {
      // if the email isnot reegistered in the database the backend respond 404 with message so to show that message to the frontend we use the path err.response.data.msg
      // console.log("problem", err.response.data.msg);
      if (!form.email || !form.password) {
        setShowErorr(true);
        return;
      }

      setNotUser(true);
      setShowErorr(false);
      // const massage = err.response.data.msg;

      // alert(err.response.data.msg);
    }
  };

  useEffect(() => {
    if (userData.user) navigate("/");
  }, [userData, navigate]);

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__form">
          <div className="login__title">
            <h3>Login to your account</h3>
          </div>
          <div className="login__dicription">
            <p>
              Don’t have an account?
              <span className="login__dicription--orange">
                <Link to="/signup">Create a new account</Link>
              </span>
            </p>
          </div>
          {showErorr && (
            <div className="error-box">
              <WarningAmberIcon />
              Email and password fields cannot be empty
            </div>
          )}
          {notUser && (
            <div className="error-box">
              <WarningAmberIcon />
              Invalid email or password. Please try again
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                className="login__input"
                type="email"
                name="email"
                onChange={handleChange}
                placeholder=" Your Email "
              />
            </div>
            <div className="password-input">
              <input
                className="login__input"
                type={passwordVisible ? "text" : "password"}
                name="password"
                onChange={handleChange}
                placeholder=" Your Password"
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
            <button className="login__btn">Submit</button>
          </form>
          <div className="login__dicription--orange">
            <Link to="/signup">Create an account</Link>
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

export default Login;
