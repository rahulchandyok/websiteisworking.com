
const express = require('express')
const fs = require('fs')
const URL = require('url')
const app = express()
const { getFileData, pingWebsite } = require('./utils')
app.use(express.json())
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

app.get('/ping_website', async (req, res) => {
  let urlParts = URL.parse(req.url, true)
  let website = urlParts.query.website
  let response = await pingWebsite(website)
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send(JSON.stringify(response)).end()
})

app.get('/get_recent_searches', (req, res) => {
  let fileData = getFileData()
  let response = []
  if (fileData) {
    for (i = 0; i < 5 && i < fileData.length; i++)
      response.push(fileData[i])
  }
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send(JSON.stringify(response)).end()
})