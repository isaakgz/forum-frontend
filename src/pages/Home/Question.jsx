import React, { useContext, useEffect } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { UserContext } from "../../context/UserContext";

import "./question.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Question() {
  const [userData, setUserData] = useContext(UserContext);
  // const [userData, setUserData] = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userData.user) navigate("/login");
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_base_url}/api/questions`
      );
      setUserData({
        ...userData,
        questions: response.data.questions,
      });
    };
    fetch();
  }, [userData.user, navigate]);
  // console.log(userData);

  const handClick = (item) => {
    setUserData({
      ...userData,
      singleQestion: {
        post_id: item.post_id,
        question_id: item.question_id,
      },
    });
    // console.log(userData);
    navigate("/answer");
  };
  // console.log(userData);
  // const navigate = useNavigate();
  return (
    <div className="question">
      {userData.questions?.map((item) => (
        <div
          className="question__container"
          key={item.index}
          onClick={() => handClick(item)}
        >
          <div className="question__profile">
            <div>
              <AccountCircleOutlinedIcon
                style={{
                  fontSize: "70px",
                  opacity: 0.5,
                }}
              />
              <p style={{ textAlign: "center", paddingBottom: "10px" }}>
                {item.user_name}
              </p>
            </div>
            <div className="question__text">{item.question}</div>
          </div>
          <div className="question__arrow">
            <Link to="/answer">
              <ArrowForwardIosIcon
                style={{
                  fontSize: "20px",
                  textDecoration: "none",
                  color: "black",
                }}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Question;
