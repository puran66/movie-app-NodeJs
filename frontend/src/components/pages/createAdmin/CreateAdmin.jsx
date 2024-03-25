import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-toastify';

const CreateAdmin = () => {
  const profileImage = useRef();
  const fullName = useRef();
  const email = useRef();
  const role = useRef();
  const password = useRef();

  const handleAdmin = async () => {
    const admin = {
      profileImage: profileImage.current.files[0],
      fullName: fullName.current.value,
      email: email.current.value,
      role: role.current.value,
      password: password.current.value
    };

    try {
      const response = await axios.post('http://localhost:3000/v1/user/sign-up', admin, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      // console.log(response.data.user);
      if (response.status === 201 || response.status === 200) {

        fullName.current.value = ""
        email.current.value = ""
        role.current.value = ""
        password.current.value = ""
        profileImage.current.files = null

        toast.success("Admin created successfully!")
      }
      else {
        toast.error("Error creating the Admin!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div class="flex justify-center items-center min-h-screen bg-[#1e293b]">
        <div class="bg-white p-8 rounded shadow-md w-full md:w-[60%] lg:w-[40%] xl:w-[30%] bg-opacity-80 backdrop-blur-md my-10">
          <h2 class="text-2xl font-semibold mb-4">Create Admin</h2>
          <div class="mb-4">
            <label for="profileImage" class="block text-gray-700 font-medium mb-1">Profile Image</label>
            <input type="file" id="profileImage" name="profileImage" ref={profileImage} class="w-full border border-gray-300 rounded-md px-4 py-2" />
          </div>
          <div class="mb-4">
            <label for="fullName" class="block text-gray-700 font-medium mb-1">Full Name</label>
            <input type="text" id="fullName" name="fullName" ref={fullName} class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-1">Email</label>
            <input type="text" id="email" name="email" ref={email} class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-4">
            <label for="role" class="block text-gray-700 font-medium mb-1">Role</label>
            <input type="text" id="role" name="role" ref={role} value="ADMIN" disabled class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div class="mb-6">
            <label for="password" class="block text-gray-700 font-medium mb-1">Password</label>
            <input type="password" id="password" ref={password} name="password" class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <button class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" onClick={handleAdmin}>Create Admin</button>
        </div>
      </div>

    </>
  )
}

export default CreateAdmin;