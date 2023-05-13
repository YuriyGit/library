const express = require('express')
const app = express()
const mongoose = require('mongoose').default
require('dotenv').config()

const indexRouter = require('./routes/routes')
const errorMiddleware = require('./middleware/error')

app.use(express.urlencoded({extended: false}))
app.set("view engine", "ejs")

app.use(express.json())

app.use('/api', indexRouter)
app.use('/user', indexRouter)

app.use(errorMiddleware)

async function start(PORT, URLDB) {
    try {
        await mongoose.connect(URLDB,{ useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB connected...'))
        app.listen(PORT, (err) => {
            if (err) console.log(err)
            console.log(`Server started on port ${PORT}...`)
        })
    } catch (e) {
        console.log(e)
    }
}

const PORT = process.env.PORT || 3000
const URLDB = process.env.URLDB || 'mongodb+srv://user:o6CImunWCpPn8UEq@books.qcacsz4.mongodb.net/?retryWrites=true&w=majority'

start(PORT, URLDB)
