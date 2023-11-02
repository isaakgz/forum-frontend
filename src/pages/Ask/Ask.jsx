
import React, { useContext, useState } from "react";
import "./ask.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import axios from "axios";

function Ask() {
  const [userData, setUserData]= useContext(UserContext);
  const navigate = useNavigate({});
  const postId = Math.floor(Math.random() * 100000);
  const [form, setForm] = useState({})
  const [showErorr, setShowErorr] = useState(false);

  const handleChange = (e)=>{
    setForm({...form, [e.target.name] : e.target.value})
    setShowErorr(false)
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      if (!form.title || !form.description){
        setShowErorr(true);
        return;
      }
      //sending the question to database
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_base_url}/api/questions`,{
        user_id: userData.user.id,
        question: form.title,
        question_description: form.description,
        post_id: `questionPost${postId}`,
      });
      navigate('/')
    }
    catch (err) {
      
      alert(err.response.data.msg);
    }
  }
  return (
    <div className="ask">
      <div className="ask__container">
        <div className="ask__instruction">
          <h2>steps to write good question</h2>
          <ul>
            <li>Summerize your problem in a one-line title.</li>
            <li>Describe your detail in more detail.</li>
            <li>Describe what you tried and what you expected to happpen. </li>
            <li>Review your question and post it to the site.</li>
          </ul>
        </div>
        <div className="ask__form">
          <div className="ask__form-title">
            <h2>Ask a public question</h2>
            <Link to="/">
              <h5>Got to question page</h5>
            </Link>

          </div>
            <form onSubmit={handleSubmit}  >
            {showErorr && (
              <div className="error-box">
                <WarningAmberIcon />
                Empty Question cannot be submitted
              </div>
            )}
              <div>
                <input onChange={handleChange} name="title" placeholder="Title" className="input__title" />
              </div>
              <div>

              <textarea
              onChange={handleChange}
              name="description"
              id=""
              cols="90"
              rows="15"
              placeholder="Description"
              className="input__description"
              
            ></textarea>
                {/* <input onChange={handleChange} name="description" className="input__description"  placeholder="Description"/> */}
              </div>
              <button>Post your question</button>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Ask;
