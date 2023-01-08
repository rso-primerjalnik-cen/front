<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/dashboard"><b>Primerjalko</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <b-navbar-nav class="ml-auto">


          <b-button variant="light" v-if="!($auth.loggedIn)"
                    @click="$auth.loginWith('keycloak')">
            <span>Prijava</span>
          </b-button>
          <b-nav-item-dropdown right v-else>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b-icon icon="person-circle"></b-icon>
              <b><em>{{ $auth.user.preferred_username }}</em></b>
            </template>
            <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            <b-dropdown-item @click="() => $auth.logout()">Odjava</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>

</style>
