<template>
  <div id="app">
    <TopNavigation v-if="showNavigation"/>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopNavigation from "@/components/TopNavigation";

export default {
  components: {
    TopNavigation
  },
  computed: {
    ...mapState(['userProfile']),
    showNavigation() {
      return Object.keys(this.userProfile).length > 1
    }
  }
}
</script>
