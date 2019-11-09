const localStorageMethods = {
  get: key => {
    return JSON.parse(window.localStorage.getItem(key))
  },
  remove: key => {
    return window.localStorage.removeItem(key)
  },
  set: (key, data) => {
    return window.localStorage.setItem(key, JSON.stringify(data))
  },
  clear: () => {
    return window.localStorage.clear()
  }
}

const DataUtil = {
  localStorageMethods: localStorageMethods
}

export default DataUtil
