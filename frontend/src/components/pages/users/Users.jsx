import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Users = () => {
  const [allUsers, setUsers] = useState([]);
  const [searchInputs, setSearch] = useState();

  const handleSearch = (e) => {
    try {
      setSearch(e.target.value);
      console.log(searchInputs);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      const getUsers = async () => {
        const response = await axios.get('http://localhost:3000/v1/user/all-users', {
          withCredentials: true
        })

        if (response.status === 200 || response.status === 204) {
          console.log(response.data.users);
          setUsers(response.data.users);
        }
      }
      getUsers();
    } catch (error) {
      console.log(error);
    }
  }, [])

  const handleDelete = async (id) => {
    try {
      // console.log(id);
      const response = await axios.delete(`http://localhost:3000/v1/user/user-delete/${id}`, { withCredentials: true });

      // console.log(response);
      if (response.status === 200 || response.status === 204) {
        toast.success("User deleted successfully");
      }
      else{
        toast.success("User can't delete now!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="search-bar my-10">
        <form class="max-w-md mx-auto">
          <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" required onChange={(e) => { handleSearch(e) }} />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
          </div>
        </form>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] m-auto mt-14">
        <table className="w-[90%] m-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-2 py-1">
                User Profile
              </th>
              <th scope="col" className="px-2 py-1">
                Full Name
              </th>
              <th scope="col" className="px-2 py-1">
                Email
              </th>
              <th scope="col" className="px-2 py-1">
                Role
              </th>
              <th scope="col" className="px-2 py-1">

              </th>
            </tr>
          </thead>
          <tbody>
            {
              allUsers.map((item, ind) => (
                <tr key={ind} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img src={item.profileImage} alt="profile-img" className="w-[80px] h-[50px] sm:w-[50px] sm:h-[30px] object-cover" />
                  </td>
                  <td className="px-2 py-1">{item.fullName}</td>
                  <td className="px-2 py-1">{item.email}</td>
                  <td className="px-2 py-1">{item.role}</td>
                  <td className="px-2 py-1">
                    <button className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800" onClick={() => handleDelete(item._id)} >
                      Remove User
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Users