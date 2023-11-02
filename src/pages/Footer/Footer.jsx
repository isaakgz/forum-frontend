import React from "react";
// import logo from "../../assets/evangadi-logo-home.png";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
// import { UserContext } from "../../context/UserContext";

import "./Footer.css";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <div className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Link to="/"><img src="https://www.evangadi.com/themes/humans//assets/images/misc/evangadi-logo-footer.png" /></Link>
          <div className="social__Container">
            <Link to="https://www.facebook.com/evangaditech" target="blank">
              <FaFacebookF className="social__logo" />
            </Link>
            <Link to="https://www.instagram.com/evangaditech/">
              <FaInstagram className="social__logo" />
            </Link>
            <Link to="https://www.youtube.com/@EvangadiTech" target="blank">
              <FaYoutube className="social__logo" target="blank" />
            </Link>
          </div>
        </div>
        <div className="footer__links">
          <h2>Useful links</h2>
          <ul>
            <li>
              <Link>How it works</Link>
            </li>
            <li>
              <Link>Terms of service</Link>
            </li>
            <li>
              <Link>privacy policy</Link>
            </li>
          </ul>
        </div>
        <div className="footer__info">
          <h2>Contact Info</h2>
          <ul>
            <li>
              <Link>Evangadi Networks</Link>
            </li>
            <li>
              <Link>suuport@evangadi.com</Link>
            </li>
            <li>
              <Link>111-111-1111</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
