import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import AdminMenu from "../AdminMenu";
import CategoryForm from "../Forms/CategoryForm";
import Main from "../Main";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(`${name} Added Sucessfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went worng with add Category");
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/category/get-category`
      );
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

  //update

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(e);
      const { data } = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} updated Sucessfully`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Worng in UpdateCategory");
    }
  };

  //delete

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/api/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`${name} deleted Sucessfully`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Worng in Delete Category");
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
            <h1>CreateCategory</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((e, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{e.name}</td>
                      <td>
                        <div>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(e.name);
                              setSelected(e);
                            }}
                          >
                            Edit
                          </button>
                          &nbsp;
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => {
                              handleDelete(e._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              handleSubmit={handleUpdate}
              value={updatedName}
              setValue={setUpdatedName}
            />
          </Modal>
        </div>
      </div>
    </Main>
  );
};

export default CreateCategory;
