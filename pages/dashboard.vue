<template>
  <div>
<!--    <b-row>-->
<!--      <b-col>-->
<!--        <h2>Dashboard</h2>-->
<!--      </b-col>-->
<!--    </b-row>-->
    <b-input-group class="mt-3">
      <template #prepend>
        <b-input-group-text>
          <b-icon icon="search" ></b-icon>
        </b-input-group-text>
      </template>
      <b-form-input></b-form-input>
      <b-input-group-append>
        <b-button variant="outline-info">Filtri <b-icon icon="chevron-down"></b-icon></b-button>
      </b-input-group-append>
    </b-input-group>

    <b-row class="my-3">
      <b-col>
        <vue-multiselect v-model="selectedProduct"
                         track-by="uuid"
                         :options="products"
                         placeholder="Izberi izdelek"
                         label="novo_ime"
                         @input="getProductPrices()"></vue-multiselect>
      </b-col>
      <b-col v-if="selectedProduct" sm="auto">
        <b-button variant="info"
                  @click="toggleFavorite()"
        >
          <b-icon v-if="favoriteProducts.product_uuids.includes(selectedProduct.uuid)" icon="heart-fill"></b-icon>
          <b-icon v-else icon="heart"></b-icon>
        </b-button>
      </b-col>
    </b-row>

    <b-table v-if="selectedProduct"
             :items="productPrices"
             :busy="!productPrices"
             ref="tableData"
             :fields="fields"
             show-empty>
      <template #table-busy>
        <div class="text-center my-2">
          <b-spinner class="align-middle mr-2" small></b-spinner>
          <strong>{{ $t('common.loading') }}</strong>
        </div>
      </template>
<!--      <template #cell(amount)="data">-->
<!--        <b-badge :variant="data.item.amount > 0 ? 'success' : 'danger'">{{ data.item.amount }}</b-badge>-->
<!--      </template>-->
<!--      <template #cell(status)="data">-->
<!--        <b-badge :variant="data.item.status === 'CLOSED' ? 'success' : data.item.status === 'PENDING' ? 'warning' : 'danger'">{{ data.item.status }}</b-badge>-->
<!--      </template>-->
<!--      <template #cell(timestamp)="data">-->
<!--        <div>{{ data.item.created_at | formatUnixTimestamp }}</div>-->
<!--      </template>-->
<!--      <template #cell(balance)="data">-->
<!--        <div>{{ data.item.balance | formatFiatPrice(data.item.currency) }}</div>-->
<!--      </template>-->
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  data(){
    return {
      products: [],
      selectedProduct: null,
      productPrices: [],
      favoriteProducts: {},
      fields: [
        {key: 'trgovina', label: "Trgovina"},
        {key: 'redna_cena_na_kos', label: "Redna Cena"},
        {key: 'kategorija', label: "Kategorija"},
        {key: 'drzava_dolgo_ime', label: "Država"},
        {key: 'date', label: "Datum"},
      ]
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
    getProductPrices(){
      this.$api.products.getProductPrices(this.selectedProduct.uuid).then(response => {
        this.productPrices = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    getFavoriteProducts(){
      this.$api.products.getUserFavorites(this.$auth.user.sub).then(response => {
        this.favoriteProducts = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    toggleFavorite(){
      if (this.favoriteProducts.product_uuids.includes(this.selectedProduct.uuid)){
        this.favoriteProducts.product_uuids.filter(uuid => uuid !== this.selectedProduct.uuid)
      } else {
        this.favoriteProducts.product_uuids.push(this.selectedProduct.uuid)
      }
      this.$api.products.storeUserFavorites(this.$auth.user.sub, {product_uuids: this.favoriteProducts.product_uuids}).then(response => {
        this.favoriteProducts = response.data
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted() {
    this.getProducts()
    this.getFavoriteProducts()
    // this.getProductPrices()
  }
}
</script>

<style scoped>

</style>
