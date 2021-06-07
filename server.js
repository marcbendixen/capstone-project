const express = require('express')
require('dotenv').config()
const app = express()

const { PORT = 4000 } = process.env

app.use('/api', express.json())
app.use('/api/series', require('./routes/series'))

app.use((req, res) => res.sendStatus(404))

app.listen(PORT, () => {
  console.log(`Server startet at http://localhost:${PORT}`)
})
