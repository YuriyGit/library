const Book = require('../models/book.js')

class BookController {
    async login(req, res) {
        try {
            res
                .status(201)
                .json({id: 1, mail: "test@mail.ru"})
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async create(req, res) {
        try {
            const {title, description, author, id} = req.body
            const newBook = new Book({title, description, author, id})
            await newBook.save()

            res.redirect(`/api/books/${newBook._id}`)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async createView(req, res) {
        try {
            res.render("books/form", {
                title: "Новая книга",
                description: "Описание книги",
                author: "Автор книги",
            })
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getAll(req, res) {
        try {
            const books = await Book.find().select('-__v')
            res.render('books/index', {
                title: "Главная страница",
                books: books,
            })
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const {id} = req.params

            const book = await Book.findById(id).select('-__v')
            const counterViews = book.views + 1
            const update = {views: counterViews,}

            await Book.findByIdAndUpdate(id, update)

            res.render('books/view', {
                title: book.title,
                description: book.description,
                views: book.views,
                id: id,
            })
        } catch (e) {
            console.log(e)
            res
                .status(404)
                .redirect('/404')
        }
    }

    async updateView(req, res) {
        try {
            const {id} = req.params
            const book = await Book.findById(id).select('-__v')
            res.render('books/form', {
                title: book.title,
                description: book.description,
                author: book.author,
            })
        } catch (e) {
            console.log(e)
            res
                .status(404)
                .redirect('/404')
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params
            const {title, description, author, favorite, fileCover, fileName, fileBook} = req.body
            await Book.findByIdAndUpdate(id, {
                title,
                description,
                author,
                favorite,
                fileCover,
                fileName,
                fileBook
            })
            res.redirect(`/api/books/${id}`)
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params

            await Book.deleteOne({_id: id})
            res.render('books/del', {
                title: "Ok",
            })
        } catch (e) {
            console.log(e)
            res.status(500).json(e)
        }
    }


}

module.exports = new BookController()