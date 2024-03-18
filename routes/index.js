const express = require('express');
const routes = express.Router();
const userRoute = require('./user.route');
const movieRoute = require('./movie.route')

routes.use('/user',userRoute);
routes.use('/movie',movieRoute)

module.exports = routes;