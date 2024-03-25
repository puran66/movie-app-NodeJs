import React, { useEffect, useState } from 'react'
import Navbar from '../../common/Navbar/Navbar'
import axios from 'axios';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get('http://localhost:3000/v1/movie/get-movies', {
        withCredentials: true
      });

      setMovies(response.data.movies);
      console.log(response.data.movies);
    }

    getData();

  }, [])
  return (
    <>
      <Navbar />
      <div className="movie-card">
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-semibold mb-4">Latest Movie:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {
              movies.map((movie,index) => {
                return (
                  <div className="bg-white shadow-md rounded-lg overflow-hidden w-64" key={index}>
                    {/* Movie Image */}
                    <img src="movie-image-url.jpg" alt="Movie" className="w-full h-40 object-cover" />

                    <div className="p-4">
                      {/* Movie Name */}
                      <h3 className="text-lg font-semibold mb-2">Movie Name</h3>
                      {/* Movie Description */}
                      <p className="text-gray-600 mb-4">Movie Description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      {/* Book Now Button */}
                      <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Book Now</button>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home