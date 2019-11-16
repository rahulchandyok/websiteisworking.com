const fs = require('fs')
const { get } = require('./request')
const axios = require('axios')

async function pingWebsite(website) {
  const { response, body } = await get(
    `https://api.downfor.cloud/httpcheck/${website}`
  )
  console.log(response, body)
  let res = { working: false, website: '', errorCode: 0 }
  if (response.statusCode != 200) {
    res.errorCode = 500
  } else {
    if (body['statusCode'] === 200 && body['isDown'] === false) {
      res.working = true
      res.website = body['returnedUrl']
      saveWebsiteInDb(website)
    } else if (body['isDown'] === true && body['statusText'] === '') {
      res.working = false
      res.website = body['returnedUrl']
      saveWebsiteInDb(website)
    } else {
      res.errorCode = 1
    }
  }
  return res
}

function saveWebsiteInDb(website) {
  if (!website) {
    console.log('nothing to save')
    return
  }
  let fileData = getFileData()
  if (!fileData) fileData = []
  let indexOfWebsite = fileData.indexOf(website)
  if (indexOfWebsite !== -1) fileData.splice(indexOfWebsite, 1)
  fileData.unshift(website)
  try {
    fs.writeFileSync('./db.txt', JSON.stringify(fileData))
  } catch (err) {
    console.error('Error in writing file', err)
  }
}

function getFileData() {
  let fileData
  try {
    fileData = fs.readFileSync('./db.txt', {
      encoding: 'utf-8'
    })
  } catch (err) {
    console.error('Error in reading file', err)
  }
  if (fileData) {
    fileData = JSON.parse(fileData)
  }
  return fileData
}

async function findAllRecord(queryParams) {
  const token = 'XbcgTtmn0ojLWvYKtyU9tXwcAVM2gFiQA0Xp5ahp'
  const { response, body } = await get(
    `https://dnspropagation.net/getip?_token=${token}&continent=0&_=${Date.now()}`
  )
  console.log(body)
  let recordType = queryParams.dnsType
  let website = queryParams.website
  return axios
    .all(
      body.map(async function(obj, index) {
        return axios
          .get(
            `https://dnspropagation.net/getresult?ip=${obj.ip}&id=${obj.id}&url=${website}&type=${recordType}`
          )
          .then(function(response) {
            return response.data
          })
      })
    )
    .then(function(list) {
      return list
    })
}
module.exports = {
  getFileData,
  pingWebsite,
  findAllRecord
}
