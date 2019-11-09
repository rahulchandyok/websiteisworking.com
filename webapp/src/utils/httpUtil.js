import Axios from 'axios'
import querystring from 'querystring'
import EnvironmentUtil from './EnvironmentUtil'

let CancelToken = Axios.CancelToken,
  cancel

let getAxiosInstance = () => {
  let config = {
    baseURL: EnvironmentUtil.getApiUrl(),
    timeout: 30000, //todo: confirm the timeout duration
    headers: {
      Accept: 'application/json'
    },
    validateStatus: function (status) {
      return status >= 200 && status < 400
    },
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  }

  let axios = Axios.create(config)

  axios.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      //todo add checks for session. Log user out, if required

      return Promise.reject(error)
    }
  )
  return axios
}

let makeRequest = (url, type, data, callback) => {
  let reqObj

  if (type === 'GET') {
    reqObj = getAxiosInstance().get(url, { params: data })
  }

  if (type === 'POST') {
    reqObj = getAxiosInstance().post(url, querystring.stringify(data))
  }
  console.log(reqObj)
  reqObj
    .then(response => {
      if (response)
        callback(
          {
            data: response.data,
          },
          null
        )
    })
    //   if (response && response.data && response.data.success) {
    //     callback(
    //       {
    //         data: response.data.data,
    //         message: response.data.message
    //       },
    //       null
    //     )
    //   } else if (response && response.data) {
    //     callback(null, {
    //       message: response.data.data
    //         ? response.data.data.error
    //         : 'Something went wrong.',
    //       id: response.data.data
    //         ? response.data.data.error
    //           ? ''
    //           : 'global.error.general.message'
    //         : 'global.error.general.message'
    //     })
    //   } else {
    //     callback(null, {
    //       message: 'Something went wrong.',
    //       id: 'global.error.general.message'
    //     })
    //   }
    // })
    .catch(error => {
      if (error.__CANCEL__) {
        console.log('Request cancelled')
      } else {
        callback(null, {
          message: 'Something went wrong.',
          id: 'global.error.network.message',
          error: error,
          errorCode: error
        })
      }
    })
}

let HttpUtil = {
  request: getAxiosInstance,
  get: (url, data, callback) => {
    makeRequest(url, 'GET', data, callback)
    return cancel
  },
  post: (url, data, callback) => {
    makeRequest(url, 'POST', data, callback)
    return cancel
  }
}

export default HttpUtil
