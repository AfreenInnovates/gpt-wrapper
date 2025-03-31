import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-70 backdrop-blur-md shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/"><h1 className="text-2xl font-bold text-white">TaskAI</h1></Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/input" className="text-gray-300 hover:text-blue-400 transition">
              Input
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
