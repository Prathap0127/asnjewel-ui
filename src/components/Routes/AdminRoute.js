import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  let [ok, setOk] = useState(false);
  let [auth] = useAuth();

  useEffect(() => {
    let authCheck = async () => {
      let res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/admin-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
