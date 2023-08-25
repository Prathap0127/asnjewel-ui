import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Main from "../Main";
import AdminCard from "../AdminCard";
import axios from "axios";

const AdminDashBoard = () => {
  const [order, setOrders] = useState([]);
  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);

  const handleCard = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/product/get-product`
      );
      console.log(data);
      setProduct(data.products);
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/all-users`
      );
      setUser(res.data.userCount);
      const order = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/all-orders`
      );
      setOrders(order.data.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCard();
  }, []);
  return (
    <Main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Admin DashBoard</h1>
            <div className="row justify-content-around">
              <AdminCard
                data={{
                  title: "Users",
                  value: user,
                  icon: "fa-user",
                  cardBorder: "primary",
                }}
              />
              <AdminCard
                data={{
                  title: "Products",
                  value: product.length,
                  icon: "fa-ring",
                  cardBorder: "primary",
                }}
              />
              <AdminCard
                data={{
                  title: "Orders",
                  value: order,
                  icon: "fa-cart-shopping",
                  cardBorder: "primary",
                }}
              />
            </div>

            {/* <div className="card mt-4 w-75 p-3">
              <h4>Name: {auth?.user?.name}</h4>
              <h4>Email: {auth?.user?.email}</h4>
              <h4>Phone: {auth?.user?.phone}</h4>
              <h4>Email: {auth?.user?.address}</h4>
            </div> */}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default AdminDashBoard;
