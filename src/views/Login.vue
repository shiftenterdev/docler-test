<template>
  <div class="container">
    <LoginHeader/>
    <div id="login" class="row justify-content-center">
      <div class="col col-6">
        <Loading v-if="processing"/>
        <div :class="{ 'signup-form': !showLoginForm }" class="card card-body mt-5" v-else>
          <div v-if="loginError" class="alert alert-warning">
            {{ loginError }}
          </div>
          <ValidationErrors :errors="validationErrorMessages"/>
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
            <h5 class="card-title">Sign up</h5>
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
import LoginHeader from "@/components/LoginHeader";
import ValidationErrors from "@/components/ValidationErrors";

export default {
  components:{
    Loading,
    LoginHeader,
    ValidationErrors
  },
  data() {
    return {
      validationErrorMessages: [],
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
      this.validationErrorMessages = []
      this.loginError = ''
      this.loginForm = {}
    },
    async login() {
      this.validationErrorMessages = [];
      if (!this.loginForm.email) {
        this.validationErrorMessages.push('Email address required.');
      }else if (!this.validEmail(this.loginForm.email)) {
        this.validationErrorMessages.push('Email address not valid.');
      }
      if (!this.loginForm.password) {
        this.validationErrorMessages.push('Password required.');
      }
      if (!this.validationErrorMessages.length) {
        this.processing = true;
        await this.$store.dispatch('login', {
          email: this.loginForm.email,
          password: this.loginForm.password
        }).then(response => {
          if (response && response.type === 'ERROR') {
            this.processing = false;
            this.loginError = response.message;
          }
        })
      }
    },
    async signup() {
      this.validationErrorMessages = [];
      if (!this.signupForm.name) {
        this.validationErrorMessages.push('Name required.');
      } else if (this.signupForm.name.length < 4) {
        this.validationErrorMessages.push('Name must be atlest 4 characters long.');
      }

      if (!this.signupForm.email) {
        this.validationErrorMessages.push('Email address required.');
      }else if (!this.validEmail(this.signupForm.email)) {
        this.validationErrorMessages.push('Email address not valid.');
      }

      if (!this.signupForm.password) {
        this.validationErrorMessages.push('Password required.');
      }else if(this.signupForm.password.length < 6){
        this.validationErrorMessages.push('Password must be atleast 6 characters or more.')
      }
      if (!this.validationErrorMessages.length) {
        this.processing = true;
        await this.$store.dispatch('signup', {
          email: this.signupForm.email,
          password: this.signupForm.password,
          name: this.signupForm.name,
        }).then(response => {
          this.processing = false;
        })
      }
    },
    validEmail: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>
