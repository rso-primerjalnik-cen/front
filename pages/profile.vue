<template>
  <b-container>
    <b-row>
      <b-col>
        <h2>Profile</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card>
          <div></div>
          <div>{{ userProfile }}</div>
        </b-card>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      userProfile: {}
    };
  },
  methods: {
    getUserProfile() {
      this.$api.users.getProfile().then(response => {
        this.userProfile = response.data;
      }).catch(error => {
        console.error(error);
      });
    }
  },
  mounted() {
    this.getUserProfile();
  }
}
</script>

<style scoped>

</style>
