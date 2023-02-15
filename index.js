const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const indexRouter = require('./routes/index')
const downloadRouter = require('./routes/download')

app.use(express.json())

app.use('/', indexRouter)
app.use('/download', downloadRouter)

app.listen(PORT, (err) => {
    err ? console.error(err) : console.log(`Server started on a port ${PORT}...`)
})