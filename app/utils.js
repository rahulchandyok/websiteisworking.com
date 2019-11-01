
const fs = require('fs')
const { get } = require('./request')

async function pingWebsite(website) {
  const { response, body } = await get(`https://api.downfor.cloud/httpcheck/${website}`)
  console.log(response, body)
  let res = { working: false, website: '', errorCode: 0 }
  if (response.statusCode != 200) {
    res.errorCode = 500
  }
  else {
    if (body['statusCode'] === 200 && body['isDown'] === false) {
      res.working = true
      res.website = body['returnedUrl']
      saveWebsiteInDb(website);
    } else if (body['isDown'] === true && body['statusText'] === '') {
      res.working = false
      res.website = body['returnedUrl']
      saveWebsiteInDb(website);
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
  if (!fileData)
    fileData = [];
  let indexOfWebsite = fileData.indexOf(website)
  if (indexOfWebsite !== -1) fileData.splice(indexOfWebsite, 1)
  fileData.unshift(website);
  try {
    fs.writeFileSync('./db.txt', JSON.stringify(fileData));
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
    fileData = JSON.parse(fileData);
  }
  return fileData
}
module.exports = {
  getFileData,
  pingWebsite
}