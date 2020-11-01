<template>
  <div class="container">
    <div class="row mt-5 justify-content-center">
      <h1 class="app-title text-primary">Dockler Test App</h1>
    </div>
    <div class="row justify-content-center my-5">
      <div class="col col-6">
        <div class="card card-body">
          <h5 class="card-title">Reset Password</h5>
          <div v-if="!showSuccess">
            <form @submit.prevent>
              <div class="form-group">
                <label for="email">Enter your email to reset your password</label>
                <input v-model.trim="email" id="email" type="email" placeholder="user@mail.com" class="form-control"/>
              </div>
              <div class="form-group">
                <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
                <button @click="resetPassword()" class="btn btn-primary">Reset</button>
              </div>
              <hr>
              <router-link :to="{name:'Login'}" class="btn btn-warning"><i class="fas fa-arrow-circle-left"></i> Login</router-link>
            </form>
          </div>
          <div v-else>
            <div class="alert alert-success">Success! Check your email for a reset link.</div>
            <hr>
            <router-link :to="{name:'Login'}" class="btn btn-warning"><i class="fas fa-arrow-circle-left"></i> Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {auth} from '@/firebase'

export default {
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: ''
    }
  },
  methods: {
    async resetPassword() {
      this.errorMsg = ''

      try {
        await auth.sendPasswordResetEmail(this.email)
        this.showSuccess = true
      } catch (err) {
        this.errorMsg = err.message
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
</style>
