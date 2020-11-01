<template>
  <div class="mb-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-12">
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
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-around mt-3" v-if="tasks">
      <div class="col col-6">
        <div class="card card-body" v-if="tasks">
          <h5 class="card-title">Todo Task(<span v-text="toDoTasks.length"></span>)</h5>
          <ul v-if="toDoTasks.length" class="list-group">
            <li v-for="task in toDoTasks" :key="task.id"
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
          <div v-else>No Task Available</div>
        </div>
      </div>
      <div class="col col-6">
        <div class="card card-body" v-if="tasks">
          <h5 class="card-title">Completed Task (<span v-text="completedTasks.length"></span>)</h5>
          <ul v-if="completedTasks.length" class="list-group">
            <li v-for="task in completedTasks" :key="task.id"
                class="list-group-item list-group-item-action d-flex justify-content-between task-done"
            >
              <div @click="updateTask(task)">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" :checked="task.done">
                </div>
                <span class="ml-4">{{ task.title }}</span>
              </div>
              <div class="btn-clear" v-if="!task.done">
                <i class="remove fas fa-times" @click.prevent="deleteTask(task)"></i>
              </div>
            </li>
          </ul>
          <div v-else>No task completed yet</div>
        </div>
      </div>
    </div>
    <div v-else><Loading/></div>
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
    ...mapState(['tasks']),
    completedTasks: function (){
      return this.$store.state.tasks.filter(function(task) {
        return task.done
      })
    },
    toDoTasks: function (){
      return this.$store.state.tasks.filter(function(task) {
        return !task.done
      })
    }
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
      if(confirm('Are you sure?')) {
        this.$store.dispatch('deleteTask', {
          task: task
        })
      }
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
  padding: 0 6px;
  color: #fff;
  border-radius: 12px;
}
</style>
