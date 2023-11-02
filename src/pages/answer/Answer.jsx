
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import "./answer.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function Answer() {
  const [userData, setUserData] = useContext(UserContext);
  const [post, setPost] = useState({});
  const [form, setForm] = useState({});
  const [answer, setAnswer] = useState([]);
  const [showErorr, setShowErorr] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(userData.singleQestion);

  useEffect(() => {
    if (!userData.user) {
      navigate("/login");
    }
    const fetch = async () => {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_base_url}/api/questions/id`,
        {
          post_id: userData.singleQestion.post_id,
        }
      );
      setPost(response.data.data);
    };
    fetch();
  }, [userData.user]);

  useEffect(() => {
    const get = async () => {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_base_url}/api/answers/all`, {
        question_id: userData.singleQestion.question_id,
      });
      // console.log(res);
      setAnswer(res.data.data);
    };
    get();
  }, [answer.length]);
  // console.log(post);

  const handelChange = (e) => {
    setForm({ [e.target.name]: e.target.value });
    setShowErorr(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.answer) {
        // throw new Error("Field must be provided");
        setShowErorr(true);
        return;
      }

      await axios.post(`${import.meta.env.VITE_REACT_APP_base_url}/api/answers`, {
        answer: form.answer,
        user_id: userData.user.id,
        question_id: post.question_id,
      });

      setAnswer(""); // Clear the answer field
      setForm({ answer: "" }); // Clear the form input
    } catch (error) {
      alert(error.message); // Display an alert with the error message
    }
  };

  // console.log(answer);
  // console.log(post);
  return (
    <div className="answer">
      <div className="answer__container">
        <h1>Question</h1>
        <div className="answer__question">
          <h2>{post?.question}</h2>
          <p>{post.question_description}</p>
        </div>
        <div className="answer__community">
          <hr />
          <h1>Answer form community</h1>
          <hr />
        </div>
        {answer &&
          answer?.map((item, index) => (
            <div key={index} className="answer__giver">
              <div className="answer__profile">
                <AccountCircleOutlinedIcon
                  style={{
                    fontSize: "70px",
                    opacity: 0.5,
                  }}
                />
                <p>{item.user_name}</p>
              </div>
              <div className="answer__detail">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}

        <div className="answer__form">
          <form onSubmit={handleSubmit}>
            <h1>Answer The Top Question</h1>
            <Link to="/">
              <p>Go to question page</p>
            </Link>
            {showErorr && (
              <div className="error-box">
                <WarningAmberIcon />
                Empty answer cannot be submitted
              </div>
            )}
            <textarea
              onChange={handelChange}
              name="answer"
              id=""
              cols="120"
              rows="15"
              placeholder="Your Answer here"
              value={form.answer}
            ></textarea>
            <button>Post your answer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Answer;
