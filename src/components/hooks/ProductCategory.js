import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get category for header
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://asnjewelshop.onrender.com/api/category/get-category"
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
