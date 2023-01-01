<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Primerjalko</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <b><em>User</em></b>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
<!--            <b-dropdown-item v-if="$auth.loggedIn()"-->
<!--                             @click="() => $auth.logout()">Sign Out</b-dropdown-item>-->
<!--            <b-dropdown-item v-else-->
<!--                             @click="$auth.loginWith('keycloak')">Sign In</b-dropdown-item>-->
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "default",
}
</script>

<style scoped>

</style>
