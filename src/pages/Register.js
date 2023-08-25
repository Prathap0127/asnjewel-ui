import React, { useState } from "react";
import toast from "react-hot-toast";
import Main from "../components/Main";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [answer, setAnswer] = useState("");

  const Navigate = useNavigate();

  //   Form Submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, phone, address);
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/users/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
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
      <div className="w-50 center">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputname"
              aria-describedby="name"
              placeholder="Name"
              required
            />
          </div>
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
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="textPhone"
              aria-describedby="Phone"
              placeholder="Phone"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputaddress"
              aria-describedby="name"
              placeholder="Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputaddress"
              aria-describedby="name"
              placeholder="Whats your Birthplace"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Main>
  );
};

export default Register;
