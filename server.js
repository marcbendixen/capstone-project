const express = require('express')
const compression = require('compression')
const path = require('path')
const app = express()
require('dotenv').config()

const { PORT = 4000 } = process.env

app.use(compression())

app.use('/api', express.json())
app.use('/api/series', require('./routes/series'))
app.use('/api/search', require('./routes/search'))
app.use(express.static('client/build'))

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'))
})

app.use((req, res) => res.sendStatus(404))

app.listen(PORT, () => {
  console.log(`Server startet at http://localhost:${PORT}`)
})
