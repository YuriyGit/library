const express = require('express')
const app = express()

const indexRouter = require('./routes/index')

app.use(express.json())

app.use('/', indexRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, (err) => {
    err ? console.error(err) : console.log(`Server started on a port ${PORT}...`)
})