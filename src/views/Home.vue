<template>
  <div id="dashboard" class="container">
    <div class="row justify-content-center">
      <div class="col col-10 px-4">
        <h3>Hi, {{userProfile.name}}</h3>
      </div>
    </div>
    <TaskList/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import TaskList from "@/components/TaskList";

export default {
  components: {
    TaskList,
  },
  data() {
    return {
      processing: true
    }
  },
  mounted() {
    this.processing = false
  },
  computed: {
    ...mapState(['userProfile'])
  }
}
</script>
