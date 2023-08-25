import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Main from "../Main";

const Users = () => {
  const [user, setUser] = useState([]);

  const handleUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/all-users`
      );
      setUser(data.users);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUsers();
  }, []);
  return (
    <Main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users</h1>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name </th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {user?.map((u, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>{u.address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Users;
