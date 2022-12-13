export default {
  buildHeaders (type, store) {
    let language = store.state.siteLanguage
    if (type === 'formHeaders') {
      return {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Accept-Language': language}}
    } else if (type === 'formFileHeaders') {
      return {headers: {'Content-Type': 'multipart/form-data', 'Accept-Language': language}}
    }
    else {
      return {headers: {'Accept-Language': language}}
    }
  },
  getHeaders (store, extraConfig=undefined) {
    let headers =  this.buildHeaders(false, store)
    if (extraConfig) {
      headers.headers = Object.assign({}, headers.headers, extraConfig)
    }
    return headers
  },
  getFormFileHeaders (store) {
    return this.buildHeaders(false, store)
  },
  getFormDataHeaders (store) {
    return this.buildHeaders('formHeaders', store)
  },
  buildQuery (args) {
    if (!args) {
      return ''
    }

    let queryList = Object.keys(args)
      .filter(key => args[key] !== undefined && args[key] !== null && args[key] !== "")
      .map(function (param) {
        return param + '=' + args[param]
      }) || []

    return queryList.length > 0 ? '?' + queryList.join('&') : ''
  }
}
