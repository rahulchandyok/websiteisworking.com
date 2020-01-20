const fs = require('fs')
const cheerio = require('cheerio')
const { get, post } = require('./request')
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

async function getSSLCheckResponse(domainName, port = 443) {
  const authenticity_token =
    'GRG5S0C+5f8kcayJz4bPRulPfcKKq4W3FyZXkCzVTk3gSq/Ka3NrbUEk1+gMNN/V9QHQ5GxjG8wFeE8OD90JVQ=='
  let formData = {
    authenticity_token: authenticity_token,
    s: 1,
    domain: domainName,
    port: 443,
    utf8: true
  }
  let { respose, body } = await post(
    'https://www.geocerts.com/ssl-checker',
    formData
  )
  console.log(body)
  let response = []
  let responseToBeSend = {}
  let html = cheerio.load(body)
  let allTags = html('div.media-body')
  for (let i = 0; i < allTags.length; i++) {
    let pTag = html(allTags[i]).find('p')
    let subresp = {}
    for (let j = 0; j < pTag.length; j++) {
      let x = pTag[j]
      let text = html(x).text()
      let arr = text.split('\n')
      // console.log('i', i, '\n')
      // console.log(arr)
      // console.log('\n')
      if (arr[0] !== '') subresp[arr[0]] = arr[1]
      else if (arr[1] !== '') subresp[arr[1]] = arr[2]
      // console.log(subresp)
      // console.log('\n\n')
    }
    response.push(subresp)
  }
  // console.log(response)
  let chains = []
  for (let i = 0; i < response.length; i++) {
    let keys = Object.keys(response[i])
    switch (i) {
      case 0:
        Object.keys(response[i]).forEach(
          key => (responseToBeSend[key] = response[i][key])
        )
        break
      case 1:
        break
      case 2:
        console.log(keys[0].split(' '))
        responseToBeSend['Expiry'] =
          keys[0].split(' ')[5] + ' ' + keys[0].split(' ')[6]
        break
      case 3:
        //TODO
        break
      case 4:
        let value = response[i][keys[0]].split(' ')
        let dns = []
        for (let j = 3; j < value.length; j++) dns.push(value[j])
        responseToBeSend['DnsResolutions'] = dns
        break
      case 5:
        break
      default:
        console.log(keys)
        console.log(response[i])
        let chain = {}
        keys.forEach(key => {
          if (key.indexOf('Common Name') != -1)
            chain['Common Name'] = key.split(':')[1]
          else chain[key] = response[i][key]
        })
        chains.push(chain)
        break
    }
  }
  responseToBeSend['chains'] = chains
  console.log(responseToBeSend)
  return responseToBeSend
}
module.exports = {
  getFileData,
  pingWebsite,
  findAllRecord,
  getSSLCheckResponse
}
