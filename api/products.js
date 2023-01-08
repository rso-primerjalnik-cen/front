import headers from './headers'

const route = '/products_api/v1/products/'

export default (axios, store) => ({
  getAllProductsFromDB(args={}, extraConfig={}){
    return axios.get(`${route}db/` + headers.buildQuery(args), headers.getHeaders(store, extraConfig))
  },
  getProductPrices(product_uuid, args={}, extraConfig={}){
    return axios.get(`${route}${product_uuid}/prices/` + headers.buildQuery(args), headers.getHeaders(store, extraConfig))
  },
  getUserFavorites(user_uuid, args={}, extraConfig={}){
    return axios.get(`${route}favorites/${user_uuid}/` + headers.buildQuery(args), headers.getHeaders(store, extraConfig))
  },
  storeUserFavorites(user_uuid, data, args={}, extraConfig={}) {
    return axios.post(`${route}favorites/${user_uuid}/` + headers.buildQuery(args), data, headers.getHeaders(store, extraConfig))
  },
})
