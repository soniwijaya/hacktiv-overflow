<template>
  <div>
    <b-navbar toggleable="md" type="light" variant="light" fixed>
      <b-container class="bv-example-row">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <router-link to="/" ><b-navbar-brand>Hacktiv Overflow</b-navbar-brand></router-link>
        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item style="color:black;"><router-link :to="{ name:'addquestion'}">Add Question</router-link></b-nav-item>
          <b-nav-item @click="logoutButton">Logout</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

export default {
  name: 'navbar',
  data: function () {
    return {
    }
  },
  methods: {
    logoutButton: function () {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('apptoken')
      localStorage.removeItem('signLogin')
      swal('Success', 'Log-out', 'success')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
