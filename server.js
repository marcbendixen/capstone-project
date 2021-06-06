const express = require('express')
const app = express()
const port = 4000

app.use('/api', (req, res) => res.send('Hello from the serientracker API!'))

app.use((req, res) => res.sendStatus(404))

app.listen(port, () => {
  console.log(`Server startet at http://localhost:${port}`)
})
