<template>
  <div>
    <v-btn icon color="success lighten-2" size="small" dark @click="toogleTask">
      <v-icon>mdi mdi-check-outline</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: 'taskDone',
  props: {
    task: {
      type: Object,
    },
    tasks: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  methods: {
    toogleTask: function () {
      // eslint-disable-next-line vue/no-mutating-props
      this.task.done = !this.task.done;
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
};
</script>
