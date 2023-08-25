import React, { useEffect, useState } from "react";
import AdminMenu from "../AdminMenu";
import Main from "../Main";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [making, setMaking] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  let navigate = useNavigate();

  //get single product
  const getSingleProduct = async () => {
    try {
      console.log(params.slug);
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/product/get-product/${params.slug}`
      );
      // console.log(data);
      setName(data?.product?.name);
      setId(data?.product?._id);
      setDescription(data.product?.description);
      setWeight(data.product?.weight);
      setMaking(data.product?.making);
      setPrice(data.product?.price);
      setQuantity(data.product?.quantity);
      setShipping(data.product?.shipping);
      setCategory(data.product?.category._id);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in get single product");
    }
  };
  useEffect(() => {
    getSingleProduct();
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
      toast.error("Something went Worng in Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //delete product

  const handleDelete = async () => {
    try {
      let confirm = window.confirm("Are you Sure want to delete the Product");
      if (!confirm) return;
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/product/product/${id}`
      );
      toast.success("Product deleted Sucessfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong in delete product");
    }
  };

  //create product

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("making", making);
      productData.append("weight", weight);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/product/update-product/${id}`,
        productData
      );
      if (data.success) {
        toast.success("product updated Sucessfully");
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
            <h1 className="text-center">Update Product</h1>
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
                value={category}
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
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product-img"
                      className="img img-responsive"
                      height={"200px"}
                    />
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      src={`${process.env.REACT_APP_SERVER_URL}/api/product/product-photo/${id}`}
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
                  type="number"
                  value={weight}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={making}
                  placeholder="write a Price"
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
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Update Product
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default UpdateProduct;
