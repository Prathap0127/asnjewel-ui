import React from "react";
import toast from "react-hot-toast";
import Main from "../components/Main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  let [email, setEmail] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let [answer, setAnswer] = useState("");
  let Navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/forgot-password`,
        {
          email,
          newPassword,
          answer,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        Navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Main>
      {/* need to change the class name */}
      <div className="register">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputanswer"
              aria-describedby="emailHelp"
              placeholder="enter your Birth Place"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="User Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Main>
  );
};

export default ForgotPassword;
