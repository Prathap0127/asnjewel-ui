import React from "react";
import useCategory from "../components/hooks/ProductCategory";
import Main from "../components/Main";
import { Link } from "react-router-dom";

const Category = () => {
  const categories = useCategory();
  return (
    <Main>
      <div className="container">
        <h1>category</h1>
        <div className="row">
          <div className="col-md-12 d-inline-flex">
            {categories.map((c) => (
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-primary ms-2"
                key={c._id}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Main>
  );
};

export default Category;
