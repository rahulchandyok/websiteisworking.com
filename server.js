
const express = require('express')
const fs = require('fs')
const URL = require('url')
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

app.get('/save_website', (req, res) => {
  let urlParts = URL.parse(req.url, true)
  let website = urlParts.query.website
  // let website = 'tavishi'
  let fileData
  try {
    fileData = fs.readFileSync('./db.txt', {
      encoding: 'utf-8'
    })
  } catch (err) {
    console.error('Error in reading file', err)
  }
  if (fileData) {
    fileData = JSON.parse(fileData);
  }
  else {
    fileData = [];
  }
  if (website) {
    let indexOfWebsite = fileData.indexOf(website)
    if (indexOfWebsite !== -1) fileData.splice(indexOfWebsite, 1)
    fileData.unshift(website);
  }
  try {
    fs.writeFileSync('./db.txt', JSON.stringify(fileData));
  } catch (err) {
    console.error('Error in writing file', err)
  }
  res
    .status(200)
    .end()
})

app.get('/get_recent_searches', (req, res) => {
  let fileData
  try {
    fileData = fs.readFileSync('./db.txt', {
      encoding: 'utf-8'
    })
  } catch (err) {
    console.error('Error in reading file', err)
  }
  let response = []
  if (fileData) {
    fileData = JSON.parse(fileData);
    for (i = 0; i < 5 && i < fileData.length; i++)
      response.push(fileData[i])
  }
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).send(JSON.stringify(response)).end()

})