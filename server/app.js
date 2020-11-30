const express = require('express')
const mongoose = require('mongoose')
const { MONGOURI } = require('./keys')
const PORT = 5000
const app = express()

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log('connected with mongo')
})
mongoose.connection.on('err', (err) => {
    console.log('error connecting', err)
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})