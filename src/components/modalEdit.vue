<template>
  <div>
    <v-btn
      icon
      color="primary lighten-2"
      dark
      size="small"
      @click="dialog = true"
    >
      <v-icon>mdi mdi-book-edit-outline</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-toolbar color="primary" dark>
          <v-toolbar-title>
            <div class="d-flex align-center flex-row">
              <v-icon size="small" class="mr-1"
                >mdi mdi-file-edit-outline
              </v-icon>
              <div>{{ $t('edit_title') }}</div>
            </div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <v-card-text>
          <div class="d-flex flex-column mt-4">
            <v-textarea
              v-model="task.subtitle"
              prepend-icon="mdi-comment"
              rows="4"
              variant="outlined"
              :label="$t('edit_title_input')"
            >
            </v-textarea>
          </div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="succesfull text-primary" @click="editTask">
            <v-icon>mdi mdi-content-save</v-icon>
            {{ $t('edit_button_save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'modalEdit',
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
      dialog: false,
    };
  },
  methods: {
    editTask: function () {
      // eslint-disable-next-line vue/no-mutating-props
      this.tasks.splice(this.tasks.indexOf(this.task), 1, this.task);
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
      this.dialog = false;
    },
  },
};
</script>
