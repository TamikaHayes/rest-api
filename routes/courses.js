/**
 * Treehouse FSJS Techdegree
 * Project 9 - REST API
 * Tamika Hayes
 * June 6, 2021
 * routes/courses.js
 */


 const express = require('express');
 const router = express.Router();
 const Course = require('../models').Course;

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
 
 
 /* GET courses listing -- returns all courses, including User that owns each course. */
 router.get('/courses', asyncHandler(async(req, res) => {
   const courses = await Course.findAll();
    res.json(courses);
    res.status(200);
 }));

 /* GET individual course by id, along with the User that owns that specific course.*/
 router.get('/courses/:id', asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id);
     res.json(course);
     res.status(200);
  }));
 
 
 /* POST course - create and add a new course to the database. */
 router.post('/courses', asyncHandler(async (req, res) => {
   let course;  
   try {
     course = await Course.create(req.body);
     //course.id = req.params.id;
     res.status(201).location(`/courses/${course.id}`).end();
   } catch (error) {
     // Check to see if the course data entered by the user is valid; if not, generate validation error message
     if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });   
      } else {
        throw error;
      }
    }
  }));
 
 /* PUT course - Update the details of an individual course, which is specfied by id  */
 router.put("/courses/:id", asyncHandler(async(req, res) => {
   let course;
   //let error;
   try {
     course = await Course.findByPk(req.params.id);
     console.log(course);
     if(course) {
       await Course.update(req.body, { where: {id: req.params.id}});
       res.status(204).end(); 
     } else {
       res.status(404).end();
       //throw new Error;
     }
   } catch (error) {
     // Check to see if the updated course data entered by the user is valid; if not, generate validation error message
     if(error.name === "SequelizeValidationError") {
       course = await Course.build(req.body);
       course.id = req.params.id;
       const errors = error.errors.map(err => err.message);
       res.status(400).json({ errors });
     } else {
       throw error;
     }
   }
 }));
 
 /* DELETE an individual course, specified by id */
 router.delete("/courses/:id", asyncHandler(async (req, res) => {
   const course = await Course.findByPk(req.params.id);
   try {
      if (course) {
        await course.destroy();
        res.status(204).end();
      } else {
        res.status(404).end();
      }  
   } catch (error) {
        if(error.name === "SequelizeValidationError") {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
}
 }));
 
 module.exports = router;