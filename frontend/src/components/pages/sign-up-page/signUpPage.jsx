import React, { useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
  const fullName = useRef();
  const profileImage = useRef();
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const handleSignUp = async () => {
    const user = {
      fullName: fullName.current.value,
      profileImage: profileImage.current.files[0],
      email: email.current.value,
      password: password.current.value
    }

    // console.log(user);

    try {
      const response = await axios.post('http://localhost:3000/v1/user/sign-up', user, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      // console.log("signup success", response);
      toast.success("signUp successfully..")

      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      // console.log(error.response.data.message);
      fullName.current.value = ""
      profileImage.current.value = ""
      email.current.value = ""
      password.current.value = ""
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1e293b]">
      <div className="bg-white p-8 rounded shadow-md w-96 bg-opacity-80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input type="text" id="fullName" name='fullName' ref={fullName} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
          <input type="email" id="email" name='email' ref={email} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
          <input type="password" id="password" name='password' ref={password} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="profileImage" className="block text-gray-700 font-medium mb-1">Profile Image</label>
          <input type="file" id="profileImage" ref={profileImage} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <button onClick={handleSignUp} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Sign Up</button>
        <p className="mt-4 text-sm text-gray-600 text-center">Allready have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a></p>
      </div>
    </div>
  );
};

export default SignUpPage;
