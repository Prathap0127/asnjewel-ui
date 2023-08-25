import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Main from "../components/Main";
import UserMenu from "../components/UserMenu";
import { useAuth } from "../context/auth";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth();
  //state
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");

  useEffect(() => {
    const { name, email, phone, address } = auth.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth.user]);
  //   Form Submit
  let handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password, phone, address);
    try {
      let { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/users/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data.error) {
        toast.error(data.message);
      } else {
        setAuth({ ...auth, user: data.updateUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center">Profile</h2>
            <div className="w-75">
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
                    disabled
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
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Profile;
