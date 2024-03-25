import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
const LoginPage = () => {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();


  const handleLogin = async () => {
    const userData = {
      email: email.current.value,
      password: password.current.value
    }

    try {
      // console.log(userData);

      const response = await axios.post('http://localhost:3000/v1/user/login', userData, { withCredentials: true });

      console.log(response.data.token);



      navigate('/')
    } catch (error) {
      console.log(error.response.data.message);
      email.current.value = ""
      password.current.value = ""
      toast.error(error.response.data.message);
    }

  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1e293b]">
      <div className="bg-white p-8 rounded shadow-md w-96 bg-opacity-80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input type="email" id="email" name="email" ref={email} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
          <input type="password" id="password" name="password" ref={password} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" onClick={handleLogin}>Login</button>
        <p className="mt-4 text-sm text-gray-600 text-center">Don't have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default LoginPage;
