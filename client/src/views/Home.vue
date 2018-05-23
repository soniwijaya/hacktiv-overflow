<template>
  <div class="home">
    <b-navbar toggleable="md" type="light" variant="light" fixed>
      <b-container class="bv-example-row">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <router-link to="/" ><b-navbar-brand>Hacktiv Overflow</b-navbar-brand></router-link>
        <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="signLogin=='show'" class="ml-auto">
          <b-nav-item style="color:black;"><router-link to="addquestion">Add Question</router-link></b-nav-item>
          <b-nav-item @click="logoutButton">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
          <b-nav-item data-scope="public_profile,email" @click="loginFacebook">Login with facebook</b-nav-item>
          <b-nav-item v-b-modal.login>Login</b-nav-item>
          <b-nav-item v-b-modal.register>Register</b-nav-item>
        </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>

    <b-modal id="login" title="Login" @ok="loginButton">
      <b-form-group description="We'll never share your email with anyone else.">
        <b-form-input v-model="login.email" type="email" placeholder="email"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="login.password" type="password" placeholder="password"></b-form-input>
      </b-form-group>
    </b-modal>

    <b-modal id="register" title="Register" @ok="registerButton">
      <b-form-group>
        <b-form-input v-model="register.fullname" type="text" placeholder="fullname"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="register.email" type="email" placeholder="email"></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-form-input v-model="register.password" type="password" placeholder="password"></b-form-input>
      </b-form-group>
    </b-modal>

    <b-container class="bv-example-row">
    <br>
    <h3>All Questions</h3>
    <hr>

    <Questionslist />

    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import Questionslist from '@/components/Questionlist.vue'

export default {
  name: 'home',
  components: {
    Questionslist
  },
  data: function () {
    return {
      login: {
        email: null,
        password: null
      },
      register: {
        fullname: null,
        email: null,
        password: null
      },
      signLogin: localStorage.getItem('signLogin'),
    }
  },
  created: function () {
      window.fbAsyncInit = function() {
        FB.init({
        appId      : '198507587628101',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
        });
            
        FB.AppEvents.logPageView();   
            
      };

      (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "https://connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
  },
  methods: {
    loginButton: function () {
        let self = this
        axios.post('https://apioverflow.thismylife.net/users/login', {
            email: this.login.email,
            password: this.login.password
        })
        .then(response => {
            swal("Welcome", response.data.message, "success")
            .then(() => {
                localStorage.setItem('id', response.data.id)
                localStorage.setItem('name', response.data.fullname)
                localStorage.setItem('apptoken', response.data.access)
                localStorage.setItem('signLogin', 'show')
                this.$router.push({ name: 'addquestion' })
            })
        })
        .catch(err => {
            swal("Your error", err.response.data.message, "error")
        })
    },
    registerButton: function () {
        axios.post('https://apioverflow.thismylife.net/users', {
            fullname: this.register.fullname,
            email: this.register.email,
            password: this.register.password
        })
        .then(response => {
            swal("Welcome", response.data.message, "success")
        })
        .catch(err => {
            swal("Your error", err.response.data.data.message, "error")
        })
    },
    loginFacebook: function () {
      let self = this
      FB.login(function(response) {
        if (response.status === 'connected') {
          axios.post('https://apioverflow.thismylife.net/login/fb',{},{
            headers: {
              token: response.authResponse.accessToken
            }
          })
          .then(response => {
            swal("Welcome", "Welcome to my apps", "success")
              .then(() => {
                localStorage.setItem('id', response.data.id)
                localStorage.setItem('token', response.data.access)
                localStorage.setItem('picture', response.data.picture.data.url)
                localStorage.setItem('name', response.data.fullname)
                self.$router.push({ name: 'addquestion' })
              })
          })
          .catch(error => {
            swal("Your error", error.response.data.message, "error")
          })
        }
      }, {scope: 'public_profile, email', return_scopes: true})
    },
    logoutButton: function () {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('apptoken')
      localStorage.removeItem('signLogin')
      this.signLogin = 'hide'
      swal('Success', 'Log-out', 'success')
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
