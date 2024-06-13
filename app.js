

// initialising server
const express = require('express');
const app = express();

// importing router
const blogRoutes = require('./routes/blogRoutes.js');

// setting environment variables
require('dotenv').config();
const port = process.env.PORT || 4000 || 5000;

// middleware to read json body
app.use(express.json());

// middleware to execute api routing
app.use('/api/v1',blogRoutes);

// connecting database...
const dbConnect = require('./config/database.js');
dbConnect();

// exposing server port...
app.listen(port, () => {console.log(`Server Listening on port ${port}`)});
