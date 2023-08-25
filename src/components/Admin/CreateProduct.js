import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Main from "../Main";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [making, setMaking] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  let navigate = useNavigate();

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
      toast.error("Something went Worng in Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("weight", weight);
      productData.append("making", making);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/product/create-product`,
        productData
      );
      if (data.success) {
        toast.success("product created Sucessfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
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
            <h1>CreateProduct</h1>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories.map((e, i) => (
                  <Option key={i} value={e._id}>
                    {e.name}
                  </Option>
                ))}
              </Select>
              {/* upload image */}
              <div className="mb-3">
                <label className="btn btn-outline-primary">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="Photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* preview image */}
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product-img"
                      className="img img-responsive"
                      height={"200px"}
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={weight}
                  placeholder="weight of the product"
                  className="form-control"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={making}
                  placeholder="making charges in Percentage"
                  className="form-control"
                  onChange={(e) => setMaking(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default CreateProduct;
