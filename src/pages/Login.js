import React from "react";
import toast from "react-hot-toast";
import Main from "../components/Main";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/auth";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [auth, setAuth] = useAuth();
  let location = useLocation();

  const Navigate = useNavigate();

  //   Form Submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/login`,
        {
          email,
          password,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        localStorage.setItem("auth", JSON.stringify(res.data));
        Navigate(location.state || "/");
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
      <div className="w-50 center">
        <h2>Login</h2>
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="User Password"
              required
            />
          </div>
          &nbsp;
          <button type="submit" className="btn btn-primary ms-2">
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              Navigate("/signup");
            }}
            className="btn btn-primary ms-1"
          >
            Signup
          </button>
          <div className="mb-3 form-check">
            <Link to={"/forgot-password"}>
              <label className="form-check-label" htmlFor="exampleCheck1">
                Forgot Password?
              </label>
            </Link>
          </div>
        </form>
      </div>
    </Main>
  );
};

export default Login;
