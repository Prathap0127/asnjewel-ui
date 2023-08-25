import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashBoard from "./components/Admin/AdminDashBoard";
import CreateProduct from "./components/Admin/CreateProduct";
import CreateCategory from "./components/Admin/CreateCategory";
import Users from "./components/Admin/Users";
import Orders from "./components/Admin/Orders";
import Profile from "./user/Profile";
import UserOrders from "./user/UserOrders";
import Products from "./components/Admin/Products";
import UpdateProduct from "./components/Admin/UpdateProduct";
import Search from "./components/Search";
import ProductDetail from "./pages/ProductDetail";
import Category from "./pages/Category";
import CategorizedProduct from "./pages/CategorizedProduct";
import CartPage from "./pages/CartPage";

function App() {
  console.log(process.env.REACT_APP_SERVER_URL);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashBoard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<Orders />} />
        </Route>
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategorizedProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
