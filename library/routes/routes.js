const express = require('express')
const router = express.Router()
const fileMulter = require('../middleware/file.js')
const path = require('path')
const BookController = require('../controller/controller.js')

router.post('/login', BookController.login)

router.post('/create', fileMulter.single('book'), BookController.create)

router.get('/create', BookController.createView)

router.get('/books', BookController.getAll)

router.get('/books/:id', BookController.getOne)

router.get('/update/:id',BookController.updateView)

router.post('/update/:id', fileMulter.single('book'),BookController.update)

router.post('/books/:id', BookController.delete)

router.get('/books/:id/download', (req, res) => {
    const {id} = req.params
    const {books} = store
    const bookIndex = books.findIndex(book => book.id === id)

    if (bookIndex === -1) {
        res
            .status(404)
            .redirect('/404')
    } else {
        const {fileName} = books[bookIndex]
        res.download(path.join(__dirname, 'books', fileName), fileName)
    }
})

module.exports = router
