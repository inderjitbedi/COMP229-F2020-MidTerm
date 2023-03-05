// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

let booksController = require('./../controllers/books')
/* GET books List page. READ */
router.get('/', booksController.getBooks);


//  GET the Book Details page in order to add a new Book
router.get('/add', booksController.addBook);


// POST process the Book Details page and create a new Book - CREATE
router.post('/add', booksController.createBook);

// GET the Book Details page in order to edit an existing Book
router.get('/:id', booksController.getBookDetails);

// POST - process the information passed from the details form and update the document
router.post('/:id', booksController.editBook);


// GET - process the delete by user id
router.get('/delete/:id', booksController.deleteBook);


module.exports = router;
