<template>
  <div id="app">
    <router-view/>
    <br>
    <br>
    <div id="footer">
        <div class="container text-center">
          <p class="footer-block">© 2018 Overflow. All Rights Reserved.</p>
        </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
}
</script>

<style>
  #footer {
    bottom: 0;
    width: 100%;
    height: 20px;
  }
  .footer-block {
    margin: 20px 0;
  }
</style>
