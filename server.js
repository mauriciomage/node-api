const express = require('express');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const colors = require('colors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env and vars
dotenv.config({ path: './config/config.env' });

// Connection to the DB
connectDB();

// Routes files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

// Body Parser
app.use(express.json());

// log the requests
app.use(logger);

// Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

// handle the errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled exceptions
process.on('unhandleRejection', (err, promise) => {
  
  //close server & exist process
  server.close(() => {
    process.exit(1);
  });

})