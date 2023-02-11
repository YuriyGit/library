const express = require('express')
const app = express()
const {v4: uuid} = require('uuid')
const PORT = process.env.PORT || 3000

class Book {
    constructor(id = uuid(), title = 'string', authors = 'string', favorite = 'string', fileCover = 'string', fileName = 'string') {
        {
            this.id = id
            this.title = title
            this.authors = authors
            this.favorite = favorite
            this.fileCover = fileCover
            this.fileName = fileName
        }
    }
}

const store = {
    books: []
}
app.use(express.json())

app.post('/api/user/login', (req, res) => {
    res
        .status(201)
        .json({id: 1, mail: "test@mail.ru"})
})

app.post('/api/books', (req, res) => {
    const book = new Book()
    const {books} = store
    books.push(book)
    res
        .status(201)
        .json(book)
})

app.get('/api/books', (req, res) => {
    const {books} = store
    res.json(books)
})

app.get('/api/books/:id', (req, res) => {
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

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
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

app.listen(PORT, (err) => {
    err ? console.error(err) : console.log(`Server started on a port ${PORT}...`)
})