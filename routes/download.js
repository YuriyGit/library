const express = require('express')
const router = express.Router()
const fileMulter = require('../middlewear/file')

router.post('/book',
    fileMulter.single('book'),
    (req, res) => {
        if (req.file) {
            const {path} = req.file
            res.json({path})
        }
        res.json('not file')
    })

module.exports = router