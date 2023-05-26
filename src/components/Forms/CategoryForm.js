import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
