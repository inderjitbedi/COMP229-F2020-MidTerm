

const book = require('../models/books');

const booksController = {
    async getBooks(req, res, next) {
        // find all books in the books collection, sorted by title
        await book.find().sort({ Title: 1 }).exec((err, books) => {
            if (err) {
                return console.error(err);
            } else {
                res.render('books/index', {
                    title: 'Books',
                    books: books
                });
            }
        });
    },
    async addBook(req, res, next) {

        const newBook = new book();

        res.render('books/details', {
            title: 'Books',
            books: newBook // pass the new book instance to the view
        });
    },
    async createBook(req, res, next) {

        let newBook = book({
            "Title": req.body.title,
            "Author": req.body.author,
            "Genre": req.body.genre,
            "Description": req.body.description,
            "Price": req.body.price
        });
        await book.create(newBook, (err, book) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                res.redirect('/books');
            }
        });

    },
    async getBookDetails(req, res, next) {
        // Find the book by id
        let id = req.params.id;
        await book.findById(id, (err, bookToEdit) => {
            res.render('books/details', {
                title: 'Edit Book',
                books: bookToEdit // pass the new book instance to the view
            });
        });
    },
    async editBook(req, res, next) {
        // Find the book by id and update the fields
        await book.findByIdAndUpdate(
            req.params.id,
            {
                Title: req.body.title,
                Price: req.body.price,
                Author: req.body.author,
                Genre: req.body.genre,
                Description: req.body.description
            },
            (err, book) => {
                if (err) {
                    return console.error(err);
                } else {
                    res.redirect('/books');
                }
            }
        );
    },
    async deleteBook(req, res, next) {

        /*****************
         * ADD CODE HERE *
         *****************/
        let id = req.params.id;
        await book.remove({ _id: id }, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            }
            else {
                res.redirect('/books');
            }

        });
    }
}

module.exports = booksController;