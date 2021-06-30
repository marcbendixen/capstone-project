const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
require('dotenv').config()

const { API_BASE_URL, API_KEY, API_LANGUAGE } = process.env

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const url = `${API_BASE_URL}/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`

  const fetchResponse = await fetch(url)
  const data = await fetchResponse.json()
  res.send(data)
})

router.get('/:id/similar', async (req, res) => {
  const { id } = req.params
  const url = `${API_BASE_URL}/${id}/similar?api_key=${API_KEY}&language=${API_LANGUAGE}`

  const fetchResponse = await fetch(url)
  const data = await fetchResponse.json()
  res.send(data)
})

router.get('/:id/credits', async (req, res) => {
  const { id } = req.params
  const url = `${API_BASE_URL}/${id}/credits?api_key=${API_KEY}&language=${API_LANGUAGE}`

  const fetchResponse = await fetch(url)
  const data = await fetchResponse.json()
  res.send(data)
})

router.get('/:id/season/:season', async (req, res) => {
  const { id, season } = req.params
  const url = `${API_BASE_URL}/${id}/season/${season}?api_key=${API_KEY}&language=${API_LANGUAGE}`

  const fetchResponse = await fetch(url)
  const data = await fetchResponse.json()
  res.send(data)
})

router.get('/popular', async (req, res) => {
  const url = `${API_BASE_URL}/popular?api_key=${API_KEY}&language=${API_LANGUAGE}`

  const fetchResponse = await fetch(url)
  const data = await fetchResponse.json()
  res.send(data)
})

module.exports = router
