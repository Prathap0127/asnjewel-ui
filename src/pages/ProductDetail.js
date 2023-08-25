import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Main from "../components/Main";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params.slug) {
      getProduct();
    }
  }, []);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/product/get-product/${params.slug}`
      );
      setProduct(data.product);
      similarProduct(data.product._id, data.product.category._id);
      console.log(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  //similar product
  const similarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProduct(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <div className="container product-details">
        <div className="row">
          <div className="col-md-5">
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/api/product/product-photo/${product._id}`}
              className="card-img-top"
              alt={product.name}
            />
          </div>
          <div className="col-md-7 product-details-info">
            <h1 className="text-center">Product Details</h1>
            <h5>Name : {product.name}</h5>
            <h5>Description : {product.description}</h5>
            <h5>Weight: {product.weight}gms</h5>
            <h5>Making Charges: {product.making}%</h5>
            <h5>Price : {product.price}</h5>
            <h5>Category : {product?.category?.name}</h5>
            <button
              className="btn btn-warning"
              onClick={() => {
                // console.log(...cart, p);
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("product added to cart");
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="container mt-2">
        <div className="row similar-products">
          <h4>Similar Product</h4>
          {relatedProduct.length < 1 && (
            <p className="text-center">No Similar Products</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProduct.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-title card-price">
                      {p.price.toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </p>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <button
                    className="btn btn-dark"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More details
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      // console.log(...cart, p);
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("product added to cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default ProductDetail;
