<template>
  <div class="container">
    <div class="row mt-5 justify-content-center">
      <h1 class="app-title text-info"><img src="/todolist.png" class="brand-img"> Dockler Test App</h1>
    </div>
    <div id="login" class="row justify-content-center">
      <div class="col col-6">
        <Loading v-if="processing"/>
        <div :class="{ 'signup-form': !showLoginForm }" class="card card-body mt-5" v-else>
          <div v-if="loginError" class="alert alert-dark">
            {{ loginError }}
          </div>
          <div v-if="errors.length" class="alert alert-warning">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error.line">{{ error }}</li>
            </ul>
          </div>
          <form v-if="showLoginForm" @submit.prevent>
            <h5 class="card-title">User Login</h5>
            <div class="form-group">
              <label for="email1">Email Address</label>
              <input v-model.trim="loginForm.email" class="form-control" type="email" placeholder="user@mail.com"
                     id="email1"/>
            </div>
            <div class="form-group">
              <label for="password1">Password</label>
              <input v-model.trim="loginForm.password" class="form-control" type="password" placeholder="******"
                     id="password1"/>
              <small><router-link :to="{name:'reset-password'}" class="text-black-50">Reset Password</router-link></small>
            </div>
            <div class="form-group d-flex justify-content-between">
              <button @click="login()" class="btn btn-primary"><span class="fas fa-sign-in-alt"></span> Login</button>
              <a @click="toggleForm()" class="btn btn-outline-info"><span class="fas fa-user"></span> Create an Account</a>
            </div>
          </form>
          <form v-else @submit.prevent>
            <h5 class="card-title">Registration</h5>
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model.trim="signupForm.name" class="form-control" type="text" placeholder="Your Name" id="name"/>
            </div>
            <div class="form-group">
              <label for="email2">Email</label>
              <input v-model.trim="signupForm.email" type="email" placeholder="you@email.com" class="form-control"
                     id="email2"/>
            </div>
            <div class="form-group">
              <label for="password2">Password</label>
              <input v-model.trim="signupForm.password" class="form-control" type="password"
                     placeholder="******" id="password2"/>
            </div>
            <div class="form-group">
              <button @click="signup()" class="btn btn-primary">Sign Up</button>
            </div>
            <hr>
            <button @click="toggleForm()" class="btn btn-warning"><i class="fas fa-arrow-circle-left"></i> Back to Log In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Loading from "@/components/Loading";

export default {
  components:{
    Loading
  },
  data() {
    return {
      errors: [],
      loginError: '',
      processing:false,
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      showPasswordReset: false
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
      this.errors = []
      this.loginError = ''
      this.loginForm = {}
    },
    async login() {
      this.errors = [];

      if (!this.loginForm.email) {
        this.errors.push('Email required.');
      }
      if (!this.loginForm.password) {
        this.errors.push('Password required.');
      }
      if (!this.errors.length) {
        this.processing = true;
        await this.$store.dispatch('login', {
          email: this.loginForm.email,
          password: this.loginForm.password
        }).then(response => {
          if (response === 'ERROR') {
            this.processing = false;
            this.loginError = 'Please check your login credentials.';
          }
        })
      }
    },
    async signup() {
      this.errors = [];
      if (!this.signupForm.email) {
        this.errors.push('Email required.');
      }
      if (!this.signupForm.name) {
        this.errors.push('Name required.');
      }
      if (!this.signupForm.password) {
        this.errors.push('Password required.');
      }
      if (!this.errors.length) {
        this.processing = true;
        await this.$store.dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
        }).then(response => {
          this.processing = false;
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
.app-title {
  font-family: 'Lobster', cursive;
}
.brand-img{
  height: 40px;
}
</style>
