const UrlUtils = {
  getUrlParams: key => {
    let urlParam = new URLSearchParams(
      decodeURIComponent(window.location.search)
    )
    return urlParam.get(key)
  }
}

export default UrlUtils
