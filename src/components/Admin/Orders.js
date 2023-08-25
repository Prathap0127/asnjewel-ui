import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import AdminMenu from "../AdminMenu";
import Main from "../Main";

const { Option } = Select;
const Orders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/users/all-orders`
      );

      setOrders(data);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  const handleChange = async (value, orderId) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/users/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => {
              return (
                <>
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">status</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr key={i + 1}>
                        <td>{i + 1}</td>
                        <td>{o.buyer.name}</td>
                        <td>{o.createdAt}</td>
                        <td>{o?.products?.length}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(value, o._id)}
                            defaultValue={o.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o.payment}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL}/api/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100%"
                            height={"120px"}
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description.substring(0, 30)}</p>
                          <p>Price : {p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Orders;
