<template>
  <div id="dashboard" class="container">
    <div class="row justify-content-center">
      <div class="col col-12 px-4">
        <h3>Hi, <span class="text-uppercase font-weight-bold font-italic">{{userProfile.name}}</span></h3>
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
