import React from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";
import Main from "./Main";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  return (
    <Main>
      <div className="container">
        <div className="text-center mt-3">
          <h5 className="text-center">Search Result</h5>
          <h6>
            {values.result.length < 1
              ? "Product Not Found"
              : `Found ${values.result.length}`}
          </h6>
          <div className="d-flex flex-wrap">
            {values.result.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_SERVER_URL}/api/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <button
                    className="btn btn-dark ms-1"
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

export default Search;
