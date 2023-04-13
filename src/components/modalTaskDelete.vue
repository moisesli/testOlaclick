<template>
  <v-btn
    icon
    color="warning lighten-2"
    size="small"
    dark
    @click="showModalDelete = true"
  >
    <v-icon>mdi-trash-can</v-icon>
  </v-btn>
  <v-dialog v-model="showModalDelete" width="480">
    <v-card>
      <v-toolbar color="grey-lighten-5">
        <v-toolbar-title>{{ $t('delete') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="showModalDelete = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <div class="d-flex flex-column">
          <div class="text-h6 pb-2">
            {{ $t('message_delete') }}
          </div>
          <div class="font-italic">"{{ task.subtitle }}".</div>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="flat" @click="showModalDelete = false">
          {{ $t('delete_button_close') }}
        </v-btn>
        <v-btn variant="tonal" color="red" @click="deleteTask">
          <v-icon>mdi-trash-can</v-icon>
          {{ $t('delete_button_delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'modalTaskDelete',
  props: {
    task: {
      type: Object,
    },
    tasks: {
      type: Array,
    },
  },
  data() {
    return {
      showModalDelete: false,
    };
  },
  methods: {
    deleteTask: function () {
      // eslint-disable-next-line vue/no-mutating-props
      this.tasks.splice(this.tasks.indexOf(this.task), 1);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.showModalDelete = false;
    },
  },
};
</script>
