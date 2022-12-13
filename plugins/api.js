import users from "@/api/users";
import products from "@/api/products";

const apiFactory = (axios, store) => ({
  products: products(axios, store),
  users: users(axios, store),
})

export default ({ $axios, store }, inject) => {
  const api = apiFactory($axios, store)
  inject('api', api)
}
