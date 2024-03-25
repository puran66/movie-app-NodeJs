require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const dbConnect = require('./db/dbConnect');
const routes = require('./routes');
const cors = require('cors')

// body parser //

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

// cors set up //

const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true,
};

app.use(cors(corsOptions))

// db conncet //

dbConnect();

// routes //
app.use('/v1', routes)
// create server //

http.createServer(app).listen(process.env.PORT, () => {
  console.log("server started");
})