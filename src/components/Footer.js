import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        <Link to="/about">About</Link>
      </p>
      <p>
        <Link to="/cart">Cart</Link>
      </p>
      <p>
        <Link to="/contact">Contact</Link>
      </p>
      <h5>Copyright &copy; Scorpions</h5>
    </div>
  );
};

export default Footer;
