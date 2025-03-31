import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, to }) => {
  return (
    <Link
      to={to}
      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-semibold 
                 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
    >
      {text}
    </Link>
  );
};

export default Button;
