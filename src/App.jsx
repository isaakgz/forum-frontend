
require('dotenv').config()
import axios from "axios";
import { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./pages/Header/Header";
import Footer from "./pages/Footer/footer";
import Ask from "./pages/Ask/Ask";
import Answer from "./pages/answer/Answer";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    //check if token already exists in localStorage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      //token not in localStorage then set auth token empty
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      //if token exists in localStorage then send request to auth to verify token and get user info
      const userRes = await axios.get(`${process.env.REACT_APP_base_url}/api/users`, {
        headers: { "x-auth-token": token },
      });

      //set the global state with user info
      // the first .data is to access axios response and the other the user info responded from backend use data as a key
      setUserData({
        token,
        user: {
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };

  const logout = () => {
    //set global state to undefined will logout the user
    setUserData({
      token: undefined,
      user: undefined,
    });

    //resetting localStorage
    localStorage.setItem("auth-token", "");
  };

  useEffect(() => {
    //check if the user is logged in
    checkLoggedIn();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={
            <div>

          <Header  logout={logout}/>
          <Signup />
          <Footer />
            </div>

          } />
          <Route
            path="/login"
            element={
              <div>
                <Header logout={logout} />
                <Login />
                <Footer />
              </div>
            }
          />
          {/* passing logout function as props to Home page */}
          <Route path="/" element={<div>
            <Header logout={logout}/>
            <Home logout={logout} />
            <Footer  />

          </div>} />
          <Route path="/questions" element={<div>
            <Header logout={logout} />
            <Ask />
            <Footer />

          </div>} />
          <Route path="/answer" element={<div>
            <Header logout={logout} />
            <Answer />
            <Footer />

          </div>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
