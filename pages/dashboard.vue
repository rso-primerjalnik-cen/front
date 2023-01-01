<template>
  <div>
    <b-row>
      <b-col>
        Dashboard
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        User - {{ $auth.user }}
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button @click="() => $auth.logout()">Logout</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div>{{ products }}</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data(){
    return {
      products: [],
      userProfile: {}
    }
  },
  methods: {
    getProducts(){
      this.$api.products.getAllProductsFromDB().then(response => {
        this.products = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    getUserProfile(){
      this.$api.users.getProfile().then(response => {
        this.userProfile = response.data
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted() {
    this.getUserProfile()
    // this.getProducts()
  }
}
</script>

<style scoped>

</style>
