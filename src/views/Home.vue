<template>
  <v-container>
    <v-card class="mx-auto mt-8 pb-6" max-width="500" elevation="2">
      <!--  Toolbar    -->
      <v-toolbar color="primary">
        <v-btn icon="mdi-menu"></v-btn>
        <v-toolbar-title>{{ $t('toolbar_title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="changeLocale('en')">EN</v-btn>
        <v-btn @click="changeLocale('es')">ES</v-btn>
      </v-toolbar>
      <!--  Input Task    -->
      <v-row class="mt-2 mx-1">
        <v-col cols="9">
          <v-text-field
            v-model="inputTask"
            @keyup.enter="addTask"
            clearable
            label="Input Task"
            type="text"
          >
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn
            left
            @click="addTask"
            class="w-100 mt-1"
            color="primary"
            size="large"
          >
            <v-icon>mdi-plus</v-icon>
            {{ $t('button_add') }}
          </v-btn>
        </v-col>
      </v-row>
      <!--   Title Task   -->
      <div class="text-grey-darken-1 px-4 pb-3 pt-1">
        {{ $t('task_subtitle') }}
      </div>
      <!--   List Task   -->
      <v-row class="mx-3" v-for="(item, index) in tasks" :key="index">
        <v-divider class="mt-3 mx-2"></v-divider>
        <v-col cols="8">
          <div
            class="text-subtitle-1"
            :class="{
              'text-decoration-line-through text-red-accent-1': item.done,
            }"
          >
            {{ item.title }}
          </div>
          <div
            class="text-body-2"
            :class="{
              'text-decoration-line-through text-red-accent-1': item.done,
              'text-grey-darken-1': !item.done,
            }"
          >
            {{ item.subtitle }}
          </div>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <task-done :task="item" :tasks="tasks" class="mr-1" />
          <modal-task-edit :task="item" :tasks="tasks" class="mr-1" />
          <modal-task-delete :task="item" :tasks="tasks" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import taskDone from '@/components/taskDone.vue';
import modalTaskDelete from '@/components/modalTaskDelete.vue';
import modalTaskEdit from '@/components/modalTaskEdit.vue';

export default {
  name: 'taskList',
  components: {
    taskDone,
    modalTaskDelete,
    modalTaskEdit,
  },
  data() {
    return {
      inputTask: '',
      tasks: [],
      showModalDelete: false,
      showModalEdit: false,
    };
  },
  methods: {
    updateTasksLocalstorage(tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    },
    changeLocale(locale) {
      // console.log(this.$i18n.locale,locale)
      this.$i18n.locale = locale;
    },
    // get all todos when loading the page
    getTasks() {
      if (localStorage.getItem('tasks')) {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      }
    },
    // add a new task
    addTask() {
      this.tasks.unshift({
        title: 'Task #' + Math.floor(Math.random() * 10000),
        subtitle: this.inputTask,
        done: false,
      });
      this.inputTask = '';
      this.updateTasksLocalstorage(this.tasks);
    },
    deleteTask() {
      // console.log(this.deleteItem);
      this.tasks.splice(this.tasks.indexOf(this.deleteItem), 1);
      this.showModalDelete = false;
      this.deleteItem = {};
    },
  },
  mounted() {
    this.getTasks();
  },
};
</script>
