const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

const { API_BASE_URL_SEARCH, API_KEY, API_LANGUAGE } = process.env

router.get('/:query', async (req, res) => {
  const { query } = req.params
  const url = `${API_BASE_URL_SEARCH}?api_key=${API_KEY}&language=${API_LANGUAGE}&page=1&query=${query}&include_adult=false&region=DE`

  const fetchResponse = await fetch(url)
  const data = await fetchResponse.json()
  res.send(data)
})

module.exports = router
