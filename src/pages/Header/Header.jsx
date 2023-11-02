import React, { useContext, useRef } from "react";
import { FaBars, FaBeer, FaTimes } from "react-icons/fa";
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../assets/evangadi-logo-home.png";
import { UserContext } from "../../context/UserContext";

function Header({logout}) {
  const [userData, setUserData] = useContext(UserContext);
  const navRef = useRef()

  const showNavbar = ()=>{
    navRef.current.classList.toggle("responsive-nav")
  }
  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img src={logo} />
        </div>
      </Link>
      <nav ref={navRef}>
        <Link className="nav_link" to="/">Home</Link>
        <Link className="nav_link"  to="/">How it works</Link>
  
        {userData.user ? (
          <button  className="header__btn" onClick={logout}>LOG OUT</button>
        ) : (
          <Link to="/login"><button className="header__btn">SIGN IN</button></Link>
        )}

        <button className="nav__btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav__btn " onClick={showNavbar}>
        <FaBars />
      </button>
    </div>
  );
}

export default Header;

{
  /* <div className="header">
      <div className="header__container">
        <Link to="/">
          <div className="header__logo">
            <img src={logo} />
          </div>
        </Link>
        <div className="header__nav">
          <div className="nav__home">
            <Link to="/">Home</Link>
          </div>
          <div className="nav__how">
            <Link to="/">How it works</Link>
          </div>

          {userData.user ? (
            <button className="header__btn">LogOut</button>
          ) : (
            <button className="header__btn">SignIn</button>
          )}
        </div>
      </div>
    </div> */
}
