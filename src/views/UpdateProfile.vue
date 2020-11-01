<template>
  <section id="settings" class="container">
    <div class="row justify-content-center">
      <div class="col col-md-6">
        <div class="card card-body">
          <h5 class="card-title">Update Profile</h5>
          <p v-if="showSuccess" class="alert alert-success">🙂 User Profile Updated</p>
          <form @submit.prevent="updateProfile()">
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model.trim="name" type="text" :placeholder="userProfile.name" id="name" class="form-control"/>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-info">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      name: '',
      showSuccess: false
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {

    updateProfile() {

      this.showSuccess = true
      this.$store.dispatch('updateProfile', {
        name: this.name !== '' ? this.name : this.userProfile.name,
      }).then(() => {
        //this.name = ''
      })

      setTimeout(() => {
        this.showSuccess = false
      }, 3000)
    }
  }
}
</script>
