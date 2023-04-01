import {createI18n} from "vue-i18n";

const messages = {
  en: {
    toolbar_title: "Task List",
    button_add: "Add",
    task_subtitle: "List Task",
    delete: "Deleting",
    message_delete: "Are you sure you want to delete:",
    delete_button_close: "close",
    delete_button_delete: "Delete",
    edit_title: "Edit Task",
    edit_title_input: "edit",
    edit_button_save: "Save"


  },
  es: {
    toolbar_title: "Lista de Tareas",
    button_add: "Agre",
    task_subtitle: "Lista de Tareas",
    delete: "Eliminar",
    message_delete: "Estas seguro que deseas eliminar:",
    delete_button_close: "cerrar",
    delete_button_delete: "eliminar",
    edit_title: "Editar Tarea",
    edit_title_input: "Editar",
    edit_button_save: "Guardar"
  }
}

export default createI18n({
  locale: import.meta.env.VITE_DEFAULT_LOCALE, // <--- 1
  fallbackLocale: import.meta.env.VITE_FALLBACK_LOCALE, // <--- 2
  legacy: false, // <--- 3
  globalInjection: true,
  messages
})
