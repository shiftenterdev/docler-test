<template>
  <div class="page-content page-container mb-5" id="page-content">
    <div class="row container d-flex justify-content-center">
      <div class="col-md-10">
        <div class="card px-3">
          <div class="card-body">
            <label for="newTask">Add New Task</label>
            <div class="input-group">
              <input type="text" @keypress.enter="createTask()" v-model.trim="title"
                     id="newTask" class="form-control"
                     :class="error?'is-invalid':''"
                     placeholder="What do you need to do today?"
                     aria-describedby="basic-addon2">
              <div class="input-group-append">
                <button class="btn btn-info" type="button" @click="createTask()"><i class="fas fa-plus-circle"></i> Add
                  Task
                </button>
              </div>
            </div>
            <small class="text-danger" v-if="error">{{ error }}</small>
            <hr>
            <h5 class="card-title">Today's Task List</h5>
            <div v-if="tasks">
              <ul v-if="tasks.length" class="list-group">
                <li v-for="task in tasks" :key="task.id"
                    class="list-group-item list-group-item-action d-flex justify-content-between"
                    :class="task.done?'task-done':''">
                  <div @click="updateTask(task)">
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" id="inlineFormCheck" :checked="task.done">
                    </div>
                    <span class="ml-4">{{ task.title }}</span>
                  </div>
                  <div class="btn-clear" v-if="!task.done">
                    <i class="remove fas fa-times" @click.prevent="deleteTask(task)"></i>
                  </div>
                </li>
              </ul>
              <div v-else>No Task Found</div>
            </div>
            <div v-else><Loading/></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import Loading from "@/components/Loading";

export default {
  components:{
    Loading
  },
  data() {
    return {
      title: '',
      error: ''
    }
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    createTask() {
      this.error = '';

      if (!this.title) {
        this.error = "Task cannot be empty";
      }
      if (!this.error) {
        this.$store.dispatch('createTask', {
          title: this.title,
          date: new Date()
        })
        this.title = ''
      }
    },
    updateTask(task) {
      this.$store.dispatch('updateTask', {
        task: task
      })
    },
    deleteTask(task) {
      this.$store.dispatch('deleteTask', {
        task: task
      })
    }
  }
}
</script>

<style lang="css" scoped>

.task-done,.task-done:hover{
  background: #dddddd;
}

.task-done span, .task-done:hover span, .task-done:active span {
  text-decoration: line-through;
  font-style: italic;
}

.list-group-item {
  cursor: pointer;
}

.btn-clear {
  background: red;
  padding: 0 10px;
  color: #fff;
  border-radius: 3px;
}
</style>
