const request = require('request')

async function get(url) {
  return new Promise((resolve, reject) => {
    request({ url: url, method: 'GET', json: true }, (error, response, body) => {
      if (error) return reject(error)

      return resolve({ body, response })
    })
  })
}

async function post(url, data) {
  return new Promise((resolve, reject) => {
    request({ url, method: 'POST', data }, (error, response, body) => {
      if (error) return reject(error)

      return resolve({ response, body })
    })
  })
}

module.exports = {
  get,
  post
}
