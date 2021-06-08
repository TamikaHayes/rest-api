/**
 * Treehouse FSJS Techdegree
 * Project 9 - REST API
 * Tamika Hayes
 * June 6, 2021
 * routes/courses.js
 */


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

// GET Route that returns the currently authenticated user.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.status(200).json({
    message: ' You have retrieved the currently authenticated user.',
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress,
    password: user.password
  });
}));

// POST Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    // Check to see if the 'new user' data entered by the user is valid; if not, generate validation error message
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));

module.exports = router;