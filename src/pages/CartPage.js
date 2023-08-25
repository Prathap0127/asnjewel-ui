import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //calculte total

  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((p) => (total = total + p.price));
      //total amout with inr standard
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //remove item in cart
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  //handle orders
  const handleOrder = async () => {
    try {
      setLoading(true);
      console.log(cart);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/product/orders`,
        { cart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      if (data.success) {
        toast.success("product placed Sucessfully");
        navigate("/dashboard/user/orders");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Main>
      <div className="container">
        <div className="row">
          <h1 className="text-center mb-2">
            {!auth.user
              ? "Hello Guest"
              : `Hello  ${auth?.token && auth?.user?.name}`}
          </h1>
          <p className="text-center">
            {cart.length
              ? `You Have ${cart.length} items in your cart ${
                  auth.token ? "" : "please login to checkout !"
                }`
              : " Your Cart Is Empty"}
          </p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 mb-2">
              {cart?.map((p) => (
                <div className="row card flex-row mb-2" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/api/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4 text-center">
              <h2>Cart Summary</h2>
              <p>Total |Checkout | Payment </p>
              <hr />
              <h4>Total:{totalPrice()}</h4>
              {auth.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>current Address</h4>
                    <h5>{auth.user?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      update address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-3">
                {!cart.length ? (
                  ""
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleOrder}
                    disabled={!auth?.user?.address}
                  >
                    Proceed Checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CartPage;
