const express = require('express')
const mongoose = require('mongoose')
const { MONGOURI } = require('./config/keys')
const PORT = process.env || 5000
const app = express()

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV == 'production') {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

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