<template>
  <v-container>
    <v-card class="mx-auto mt-8 pb-6" max-width="500" elevation="2">
      <!--  Toolbar    -->
      <v-toolbar color="primary">
        <v-btn icon="mdi-menu"></v-btn>
        <v-toolbar-title>{{ $t("toolbar_title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="changeLocale('en')">EN</v-btn>
        <v-btn @click="changeLocale('es')">ES</v-btn>
      </v-toolbar>
      <!--  Input Task    -->
      <v-row class="mt-2 mx-1">
        <v-col cols="9">
          <v-text-field
            v-model="newTask"
            clearable label="Input Task"
            type="text">
          </v-text-field>
        </v-col>
        <v-col cols="3">
          <v-btn left @click="addTask" class="w-100 mt-1" color="primary" size="large">
            <v-icon>mdi-plus</v-icon>
            {{ $t("button_add") }}
          </v-btn>
        </v-col>
      </v-row>
      <!--   Title Task   -->
      <div class="text-grey-darken-1 px-4 pb-3 pt-1">
        {{ $t("task_subtitle") }}
      </div>
      <!--   List Task   -->
      <v-row class="mx-3" v-for="(item, index) in tasks" :key="index">
        <v-divider class="mt-3 mx-2"></v-divider>
        <v-col cols="8">
<!--          <div class="text-subtitle-1" :class="{ 'text-decoration-line-through text-red-accent-1': item.done }">-->
<!--            {{ item.title }}-->
<!--          </div>-->
          <div
            class="text-body-2"
            :class="{ 'text-decoration-line-through text-red-accent-1': item.done, 'text-grey-darken-1': !item.done }">
            {{ item.subtitle }}
          </div>
        </v-col>
        <v-col cols="4" class="d-flex align-center">
          <v-btn icon elevation="0" @click="toggleTask(item)">
            <v-icon class="text-blue-darken-1">mdi mdi-check-outline</v-icon>
          </v-btn>
          <v-btn icon elevation="0" @click="openEditModal(item)">
            <v-icon class="text-amber-darken-1">mdi mdi-book-edit-outline</v-icon>
          </v-btn>
          <v-btn icon elevation="0" @click="openDeleteModal(item)">
            <v-icon class="text-red-darken-1">mdi-trash-can</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <!--  Modal Edit -->
    <v-dialog
      v-model="statusEditModal"
      max-width="420"
    >
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            <div class="d-flex align-center flex-row">
              <v-icon size="small" class="mr-1">mdi mdi-file-edit-outline</v-icon>
              <div>{{ $t("edit_title")}}</div>
            </div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="statusEditModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="d-flex flex-column mt-4">
            <v-textarea
              v-model="editItem.subtitle"
              prepend-icon="mdi-comment"
              rows="4"
              variant="outlined"
              :label="$t('edit_title_input')">
            </v-textarea>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="succesfull text-primary" @click="statusEditModal = false">
            <v-icon>mdi mdi-content-save</v-icon>
            {{ $t("edit_button_save")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  End Modal Edit -->
    <!--  Modal Delete -->
    <v-dialog
      v-model="statusDeleteModal"
      max-width="480"
    >
      <v-card>
        <v-toolbar color="red">
          <v-toolbar-title>{{ $t("delete") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="statusDeleteModal = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <div class="d-flex flex-column">
            <div class="text-h6 pb-2">
              {{ $t("message_delete") }}
            </div>
            <div class="font-italic">"{{ deleteItem.subtitle }}".</div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="flat" @click="statusDeleteModal = false">
            {{ $t("delete_button_close")}}
          </v-btn>
          <v-btn variant="tonal" color="red" @click="deleteTask">
            <v-icon>mdi-trash-can</v-icon>
            {{ $t("delete_button_delete")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!--  End Modal  -->
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      newTask: 'A simple todo list built with Vue.js 2.0 that saves your todo items in the LocalStorage.',
      tasks: [],
      statusDeleteModal: false,
      statusEditModal: false,
      deleteItem: {},
      editItem: {}
    }
  },
  methods: {
    changeLocale(locale){
      // console.log(this.$i18n.locale,locale)
      this.$i18n.locale = locale
    },
    // get all todos when loading the page
    getTasks() {
      if (localStorage.getItem('task_list')) {
        this.tasks = JSON.parse(localStorage.getItem('task_list'));
      }
    },
    // add a new task
    addTask() {
      console.log(this.newTask)
      this.tasks.unshift({
        title: "Task #" + Math.floor(Math.random() * 10000),
        subtitle: this.newTask,
        done: false,
      });

      this.newTask = 'A simple todo list built with Vue.js 2.0 that saves your todo items in the LocalStorage.'
      // console.log('sendTask')
      // save the new item in localstorage
      return true;
    },
    openDeleteModal(item) {
      this.deleteItem = item
      this.statusDeleteModal = true
    },
    openEditModal(item) {
      this.statusEditModal = true
      this.editItem = item
      // console.log(item)
    },
    deleteTask() {
      console.log(this.deleteItem)
      this.tasks.splice(this.tasks.indexOf(this.deleteItem), 1);
      this.statusDeleteModal = false
      this.deleteItem = {}
    },
    toggleTask: function (item) {
      item.done = !item.done;
    },
    clearAll() {
      this.todoList = [];
    }
  },
  watch: {
    tasks: {
      handler: function (updatedList) {
        function sort_by_id() {
          return function (elem1, elem2) {
            if (elem1.id < elem2.id) {
              return -1;
            } else if (elem1.id > elem2.id) {
              return 1;
            } else {
              return 0;
            }
          };
        }
        console.log(JSON.stringify(updatedList))
        localStorage.setItem('task_list', JSON.stringify(updatedList.sort(sort_by_id())));
      },
      deep: true
    }
  },
  mounted() {
    this.getTasks()
  }
}
</script>
