import axios from "axios";
import React, { useEffect, useState } from "react";
// import { json } from "react-router-dom";
import Main from "../components/Main";
// import { useAuth } from "../context/auth";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
import PageSlider from "../components/PageSlider";

const Home = () => {
  // const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  //to load the data of product
  const [loading, setLoading] = useState(false);
  // const [radio, setRadio] = useState([]);

  const navigate = useNavigate();

  //get Product
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  //get category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/category/get-category`
      );
      console.log(data);
      if (data.success) {
        console.log(data.category);
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(checked);
    if (!checked?.length) getAllProduct();
  }, [checked?.length]);

  useEffect(() => {
    console.log(checked);
    if (checked?.length) filterProduct();
  }, [checked]);

  //filter

  const handleFilter = (value, id) => {
    try {
      let all = [...checked];
      if (value) {
        all.push(id);
      } else {
        all = all.filter((e) => e !== id);
      }
      setChecked(all);
      // console.log(value, id);
    } catch (error) {
      console.log(error);
    }
  };

  //get filtered Product

  const filterProduct = async () => {
    try {
      console.log(checked);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/product/filter-products`,
        { checked }
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load More button

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Main>
      {/* <pre>{JSON.stringify(auth, null, 4)}</pre> */}
      <PageSlider />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-center"> Filter by category</h4>
            <div className="d-flex flex-column ms-2">
              {categories.map((c, i) => (
                <Checkbox
                  onClick={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </div>
          <div className="col-md-9">
            {/* {JSON.stringify(checked, null, 4)} to verfiy */}
            <h1 className="text-center">All Products</h1>
            <div className="category d-flex flex-wrap">
              {products?.map((p) => (
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

            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-danger"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Home;
