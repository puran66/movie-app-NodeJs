import Cookies from 'js-cookie';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login')
  }
  return (
    <nav className="bg-[#1e293b] py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center relative">
          <div className="flex items-center">
            {/* Logo */}
            <a href="/" className="text-white font-bold text-lg">MOVIWORLD</a>
          </div>
          {/* Responsive menu button */}
          <div className="block lg:hidden">
            <button className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          {/* Menu items */}
          <div className="hidden lg:flex space-x-8">
            <a href="/" className="text-white hover:text-gray-300">Movies</a>
            <a href="/all-users" className="text-white hover:text-gray-300">Users</a>
            <a href="add-movie" className="text-white hover:text-gray-300">Add Movie</a>
            <a href="/create-admin" className="text-white hover:text-gray-300">Create Admin</a>
            <a className="text-white hover:text-gray-300 cursor-pointer" onClick={handleLogout}>Logout<FontAwesomeIcon icon={faRightFromBracket} style={{ color: "#ffffff", marginLeft: "10px" }} /></a>
          </div>
          <div className="absolute right-[-70px]">
            <a class="flex items-center justify-center bg-white text-blue-500 rounded-full w-10 h-10 focus:outline-none cursor-pointer"
              href="/profile">
              <img src="" alt="profileImage" class="object-cover rounded-full w-full h-full" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
