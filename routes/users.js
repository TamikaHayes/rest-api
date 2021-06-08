'use strict';

const express = require('express');
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async (req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        //Forward error to the global error handler
        next(error);
      }
    }
  }

// Construct a router instance.
const router = express.Router();

// Route that returns the currently authenticated user.
router.get('/users', asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({
    message: ' You have retrieved the currently authenticated user.',
    firstName: user.firstName,
    lastName: user.lastName
  });
}));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/');
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

module.exports = router;