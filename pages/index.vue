<template>
  <div>
    <b-row>
      <b-col>
        <b-button @click="$auth.loginWith('keycloak')">Login</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  auth: 'guest'
}
</script>
