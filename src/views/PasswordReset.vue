<template>
  <div class="container">
    <LoginHeader/>
    <div class="row justify-content-center my-5">
      <div class="col col-6">
        <div class="card card-body">
          <h5 class="card-title">Reset Password</h5>
          <div>
            <form @submit.prevent>
              <ValidationErrors :errors="validationErrorMessages"/>
              <div class="form-group">
                <label for="email">Enter your email to reset your password</label>
                <input v-model.trim="email" id="email" type="email" placeholder="user@mail.com" class="form-control"/>
              </div>
              <div class="form-group">
                <p v-if="showSuccess" class="alert alert-success">Success! Check your email for a reset link.</p>
                <p v-if="serverErrorMsg !== ''" class="alert alert-warning">{{ serverErrorMsg }}</p>
                <button @click="resetPassword()" class="btn btn-primary">Reset</button>
              </div>
              <hr>
              <router-link :to="{name:'Login'}" class="btn btn-warning"><i class="fas fa-arrow-circle-left"></i> Login</router-link>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {auth} from '@/firebase'
import LoginHeader from "@/components/LoginHeader";
import ValidationErrors from "@/components/ValidationErrors";

export default {
  components:{
    LoginHeader,
    ValidationErrors
  },
  data() {
    return {
      email: '',
      showSuccess: false,
      serverErrorMsg: '',
      validationErrorMessages:[]
    }
  },
  methods: {
    async resetPassword() {
      this.serverErrorMsg = ''
      this.validationErrorMessages = [];
      if (!this.email) {
        this.validationErrorMessages.push('Email address required.');
      }else if (!this.validEmail(this.email)) {
        this.validationErrorMessages.push('Email address not valid.');
      }
      if (!this.validationErrorMessages.length) {
        try {
          await auth.sendPasswordResetEmail(this.email)
          this.showSuccess = true
        } catch (err) {
          this.serverErrorMsg = err.message
        }
      }
    },
    validEmail: function (email) {
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>
