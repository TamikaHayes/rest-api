/**
 * Treehouse FSJS Techdegree
 * Project 9 - REST API
 * Tamika Hayes
 * June 6, 2021
 * routes/courses.js
 */


'use strict';

const { sequelize } = require('./models');
const users = require('./routes/users');
const courses = require('./routes/courses');

// load modules
const express = require('express');
const morgan = require('morgan');

// import routes
const router = express.Router();

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Create the Express app
const app = express();

// Setup request body JSON parsing.
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// Setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// Add routes.
app.use('/api', users);
app.use('/api', courses);

// Send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// Set our port
app.set('port', process.env.PORT || 5000);

// async IIFE to test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();

// Sequelize model synchronization, then start listening on our port
sequelize.sync().then(() => {
  const server = app.listen(app.get('port'), () => {
    console.log(`Express server is listening on port ${server.address().port}`);
  });
});


