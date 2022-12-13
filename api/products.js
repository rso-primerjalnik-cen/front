import headers from './headers'

const route = '/products_api/v1/products/'

export default (axios, store) => ({
  getAllProducts(args={}, extraConfig={}){
    return axios.get(`${route}` + headers.buildQuery(args), headers.getHeaders(store, extraConfig))
  },
})
