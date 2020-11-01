<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-info mb-5">
    <div class="container">
      <router-link class="navbar-brand app-title" :to="{name:'home'}">Dockler Test App</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'home'}">Home</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name:'update-profile'}">Update Profile</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link btn btn-sm btn-dark" href="javascript:" @click="logout()">Logout <i class="fas fa-sign-out-alt"></i></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import {mapState} from "vuex";

export default {
  data(){
    return{
      appName:'',
      userName:''
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.app-title{
  font-family: 'Lobster', cursive;
}
</style>
