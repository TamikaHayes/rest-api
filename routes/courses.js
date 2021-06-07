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
 
 
//  /* "Create a new book" -- add details about newly acquired books in "Create Book" form. */
//  router.get('/new', (req, res) => {
//    res.render("books/new-book", { book: {}, title: "New Book"});
//  });
 
//  /* POST newly created book entries to database. */
//  router.post('/', asyncHandler(async (req, res) => {
//    let book;
//    try {
//      book = await Book.create(req.body);
//      res.redirect("/");
//    } catch (error) {
//      // Check to see if the form data entered by the user is valid; if not, re-render page with error message
//      if(error.name === "SequelizeValidationError") {
//        book = await Book.build(req.body);
//        res.render("books/new-book", { book, errors: error.errors, title: "New Book" })
//      } else {
//        throw error;
//      }  
//    }
//  }));
 
//  /* GET individual book - populate book details in the "Update Book" form. */
//  router.get("/:id", asyncHandler(async (req, res) => {
//    const book = await Book.findByPk(req.params.id);
//    if(book) {
//      res.render("books/update-book", { book, title: "Update Book" });  
//    } else {
//      throw error;
//    }
//  })); 
 
//  /* Update a book's details, using the "Update Book" form. */
//  router.post("/:id/", asyncHandler(async(req, res) => {
//    let book;
//    try {
//      book = await Book.findByPk(req.params.id);
//      if(book) {
//        await book.update(req.body);
//        res.redirect("/"); 
//      } else {
//        throw error;
//      }
//    } catch (error) {
//      // Check to see if the form data entered by the user is valid; if not, re-render page with error message
//      if(error.name === "SequelizeValidationError") {
//        book = await Book.build(req.body);
//        book.id = req.params.id;
//        res.render("books/update-book", { book, errors: error.errors, title: "Update Book" })
//      } else {
//        throw error;
//      }
//    }
//  }));
 
//  /* Delete a book, using the "Update Book" form. (**IMPORTANT user note** This action cannot be undone!) */
//  router.post("/:id/delete", asyncHandler(async (req, res) => {
//    const book = await Book.findByPk(req.params.id);
//    if (book) {
//      await book.destroy();
//      res.redirect("/");
//    } else {
//      throw error;
//    }
     
//  }));
 
 module.exports = router;