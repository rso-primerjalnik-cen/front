<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/dashboard"><b>Primerjalko</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!--        <b-navbar-nav>-->
        <!--          <b-nav-item href="#">Link</b-nav-item>-->
        <!--        </b-navbar-nav>-->

        <!--        <b-navbar-nav class="ml-auto mr-auto">-->
        <!--          <b-nav-form>-->
        <!--            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>-->
        <!--            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>-->
        <!--          </b-nav-form>-->
        <!--        </b-navbar-nav>-->

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">


          <b-button v-if="!($auth.loggedIn)"
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
