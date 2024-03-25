import axios from 'axios';
import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMovie = () => {
  const movieImageUrl = useRef();
  const movieName = useRef();
  const movieDescription = useRef();

  const navigate = useNavigate();

  const handleAddMovie = async () => {
    const movieData = {
      movieImageUrl: movieImageUrl.current.files[0],
      movieName: movieName.current.value,
      movieDescription: movieDescription.current.value
    };

    // console.log('Adding movie:', movieData);
    try {

      const response = await axios.post('http://localhost:3000/v1/movie/addMovie', movieData, {
        withCredentials: true, headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      // console.log(response);

      if (response.status === 200 || response.status === 201) {

        toast.success("movie  added successfully");
        
        setTimeout(()=>{
          navigate('/');
        },2000)
      }
    } catch (error) {
      console.log(error.response.data.message);
      movieName.current.value = ""
      movieDescription.current.value = ""
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1e293b]">
      <div className="bg-white p-8 rounded shadow-md w-96 bg-opacity-80 backdrop-blur-md">
        <h2 className="text-2xl font-semibold mb-4">Add Movie</h2>
        <div className="mb-4">
          <label htmlFor="movieImageUrl" className="block text-gray-700 font-medium mb-1">Movie Image URL</label>
          <input type="file" id="movieImageUrl" name="movieImageUrl" ref={movieImageUrl} className="w-full border border-gray-300 rounded-md px-4 py-2  " />
        </div>
        <div className="mb-4">
          <label htmlFor="movieName" className="block text-gray-700 font-medium mb-1">Movie Name</label>
          <input type="text" id="movieName" name="movieName" ref={movieName} className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="movieDescription" className="block text-gray-700 font-medium mb-1">Movie Description</label>
          <textarea id="movieDescription" name="movieDescription" ref={movieDescription} rows="4" className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"></textarea>
        </div>
        <button onClick={handleAddMovie} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Add Movie</button>
      </div>
    </div>
  );
};

export default AddMovie;
