import headers from './headers'

const route = '/users_api/v1/users/'

export default (axios, store) => ({
  getProfile(args={}, extraConfig={}){
    return axios.get(`${route}profile/` + headers.buildQuery(args), headers.getHeaders(store, extraConfig))
  },
  updateUserProfile(id, data, args={}, extraConfig={}){
    return axios.patch(`${route}profile/${id}/` + headers.buildQuery(args), data, headers.getHeaders(store, extraConfig))
  },
  changePassword(id, data, args={}, extraConfig={}) {
    return axios.patch(`${route}profile/${id}/change-password` + headers.buildQuery(args), data, headers.getHeaders(store, extraConfig))
  }
})
