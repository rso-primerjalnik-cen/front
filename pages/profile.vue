<template>
  <b-container class="my-5">
    <b-row>
      <b-col>
        <h3 class="my-4">PROFIL</h3>
        <b-card style="background-color: #def7fa">
          <b-form>
            <b-row>
              <b-col>
                <b-form-group label="Ime" label-for="first-name">
                  <b-form-input id="first-name" v-model="userProfile.firstName"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="Priimek" label-for="last-name">
                  <b-form-input id="last-name" v-model="userProfile.lastName"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group label="Uporabniško ime" label-for="username">
                  <b-form-input id="username" v-model="userProfile.username" disabled></b-form-input>
                </b-form-group>
              </b-col>
              <b-col>
                <b-form-group label="E-Mail" label-for="email">
                  <b-form-input id="email" v-model="userProfile.email" disabled></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-button @click="updateUserData" variant="info" class="float-right">Posodobi podatke</b-button>
          </b-form>
        </b-card>
        <h3 class="my-4">PRILJUBLJENI IZDELKI</h3>
        <b-card style="background-color: #def7fa">
<!--          <pre>{{ favoriteProducts.products }}</pre>-->
          <b-table v-if="favoriteProducts"
                   :responsive="true"
                   :items="favoriteProducts.products"
                   :fields="favoritesFields"
                   show-empty>
          </b-table>

        </b-card>
        <h3 class="my-4">VSI UPORABNIKI</h3>
        <b-card style="background-color: #def7fa">
          <b-table :items="allUsers"
                   :busy="!allUsers"
                   :fields="allUsersFields"
                   show-empty>
          </b-table>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import gql from 'graphql-tag'
export default {
  name: "profile",
  apollo: {
    allUsers: gql`
     query allUsers {
       allUsers
     }
    `,
    userProfile: {
      query: gql`
         query userProfile($userUuid: String!) {
           userProfile(userUuid: $userUuid)
         }
        `,
      variables() {
        return {
          userUuid: this.$auth.user.sub
        }
      }
    },
  },
  data() {
    return {
      userProfile: {},
      favoriteProducts: {},
      favoritesFields: [
        {key: 'novo_ime', label: "Ime"},
        {key: 'blagovna_znamka', label: "Blagovna znamka", sortable: true},
        {key: 'kategorija', label: "Kategorija"},
        {key: 'drzava_proizvajalca_poreklo', label: "Poreklo"},
      ],
      allUsersFields: [
        {key: 'username', label: "Uporabniško ime"},
        {key: 'firstName', label: "Ime"},
        {key: 'lastName', label: "Priimek"},
        {key: 'email', label: "Email"},
        {key: 'emailVerified', label: "Email Verfied"},
      ],
    };
  },
  methods: {
    getUserProfile() {
      this.$api.users.getProfile().then(response => {
        this.userProfile = response.data;
      }).catch(error => {
        console.error(error);
      });
    },
    getFavoriteProducts(){
      this.$api.products.getUserFavorites(this.$auth.user.sub, {just_uuid: 0}).then(response => {
        this.favoriteProducts = response.data
      }).catch(error => {
        console.error(error)
      })
    },
    updateUserData(){
      this.$api.users.updateUserProfile(this.$auth.user.sub, this.userProfile).then(response => {
        this.$toast.success('Podatki uspešno posodobljeni', {
          title: 'Posodobitev podatkov',
          variant: 'success',
          solid: true
        })
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted() {
    // this.getUserProfile();
    this.getFavoriteProducts()
  }
}
</script>

<style scoped>

</style>
