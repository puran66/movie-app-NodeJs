# Movie App Backend

Welcome to the Movie App Backend repository! This backend is designed to manage movies and users within the system, providing functionalities like adding, updating, deleting movies, and managing user authentication.

## Summary

The Movie App Backend is built using Node.js and Express.js along with MongoDB for database storage. It utilizes JWT for user authentication, Cloudinary for image storage, and Multer for file uploads. The backend provides a set of RESTful APIs for managing movies and user-related operations.

## Getting Started

To get started with the Movie App Backend, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/puran66/movie-app-NodeJs



## Installation

Install dependencies:

```bash
  npm install
```


    
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB`   : MongoDB connection URI
 
`SECRETKEYFORTOKEN`  : Secret key for JWT token generation

`CLOUDNAME`,`APIKEY`,`APISECRET` : Cloudinary credentials

`PORT` : Port for the server (optional, default is 3000)


## Start the server:

To deploy this project run

```bash
  npm start

```


## Documentation

For detailed documentation on how to use the Movie App Backend, refer to the [Documentation](https://github.com/puran66/movie-app-NodeJs/blob/main/backend/documentation.text)


## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

