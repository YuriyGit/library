const express = require('express')
const {v4: uuid} = require("uuid");
const router = express.Router()
const fileMulter = require('../middlewear/file')
const path = require('path')

class Book {
    constructor(id = uuid(), title = 'string', description = 'string', authors = 'string', favorite = true, fileCover = 'string', fileName = 'string', fileBook = "string") {
        {
            this.id = id
            this.title = title
            this.description = description
            this.authors = authors
            this.favorite = favorite
            this.fileCover = fileCover
            this.fileName = fileName
            this.fileBook = fileBook
        }
    }
}

const store = {
    books: []
}
router.post('/api/user/login', (req, res) => {
    res
        .status(201)
        .json({id: 1, mail: "test@mail.ru"})
})

router.post('/api/books',
    fileMulter.single('book'),
    (req, res) => {
        const book = new Book()
        const {books} = store
        books.push(book)
        res
            .status(201)
            .json(book)
    })

router.get('/api/books', (req, res) => {
    const {books} = store
    res.json(books)
})

router.get('/api/books/:id', (req, res) => {
    const {id} = req.params
    const {books} = store
    const bookID = books.findIndex(book => book.id === id)
    if (bookID !== -1) {
        res.json(books[bookID])
    } else {
        res
            .status(404)
            .json({errorCode: 404, errorMsg: 'not found'})
    }
})

router.put('/api/books/:id',
    fileMulter.single('book'),
    (req, res) => {
        const {books} = store
        const {title, authors, favorite, fileCover, fileName} = req.body
        const {id} = req.params
        const bookID = books.findIndex(book => book.id === id)
        if (bookID !== -1) {
            books[bookID] = {
                ...books[bookID],
                title,
                authors,
                favorite,
                fileCover,
                fileName,
            }
            res.json(books[bookID])
        } else {
            res
                .status(404)
                .json({errorCode: 404, errorMsg: 'not found'})
        }
    })

router.delete('/api/books/:id', (req, res) => {
    const {books} = store
    const {id} = req.params
    const bookID = books.findIndex(book => book.id === id)
    if (bookID !== -1) {
        books.splice(bookID, 1)
        res.json('Ok')
    } else {
        res
            .status(404)
            .json({errorCode: 404, errorMsg: 'not found'})
    }
})

router.get('/api/books/:id/download', (req, res) => {
    const {id} = req.params
    const {books} = store
    const bookID = books.findIndex(book => book.id === id)
    if (bookID !== -1) {
        const {fileName} = books[bookID]
        res.sendFile(path.join(__dirname, 'books', fileName))
    } else {
        res
            .status(404)
            .json({errorCode: 404, errorMsg: 'not found'})
    }
})

module.exports = router

console.log(path.join(__dirname, 'books',))