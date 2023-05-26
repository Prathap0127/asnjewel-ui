import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Main from "../components/Main";

const CategorizedProduct = () => {
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.slug) {
      getProductbyCate();
    }
  }, [params.slug]);

  const getProductbyCate = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/product/product-category/${params.slug}`
      );
      setProduct(data.products);
      setCategory(data.category);
      console.log(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Main>
      <div className="container mt-3">
        <h2 className="text-center">Category-{category.name}</h2>
        <p className="text-center">{product.length} Result Found</p>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="category d-flex flex-wrap">
              {product?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <p className=" card-price">
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
                      className="btn btn-dark "
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More details
                    </button>
                    <button className="btn btn-warning">Add to cart</button>
                  </div>
                </div>
              ))}
            </div>

            {/* <div className="m-2 p-3">
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
            </div> */}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CategorizedProduct;
