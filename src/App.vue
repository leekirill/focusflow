<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import AppTaskItem from "./components/AppTaskItem.vue";

let tasks = ref([]);
let formIsOpen = ref(false);
let formData = ref({
  taskName: null,
  taskDesribe: null,
  taskPriority: null,
});

// Добавляем задачу

const openForm = () => {
  formIsOpen.value = !formIsOpen.value;
};

const addItem = () => {
  // Валидаци полей
  if (
    formData.value.taskName === null ||
    formData.value.taskDesribe === null ||
    formData.value.taskPriority === null
  ) {
    alert("Fill the inputs");
    return;
  }

  const newTask = {
    id: Math.floor(Math.random() * 100),
    taskName: formData.value.taskName,
    taskDesribe: formData.value.taskDesribe,
    taskPriority: formData.value.taskPriority,
    editMode: false,
    checked: false,
  };

  tasks.value.push(newTask);
  formData.value.taskName = null;
  formData.value.taskDesribe = null;
  formData.value.taskPriority = null;
  formIsOpen.value = !formIsOpen.value;
};

// Редактируем задачу

// const handleEditMode = (id) => {
//   tasks.value.filter((task) => {
//     if (task.id === id) {
//       task.editMode = !task.editMode;
//     }
//   });
// };

// const saveEditedTaskName = (id, value) => {
//   tasks.value.filter((task) => {
//     if (task.id === id) {
//       task.name = value;
//       task.editMode = !task.editMode;
//     }
//   });
// };

// Удаляем задачу

// const removeTask = (id) => {
//   tasks.value = tasks.value.filter((task) => task.id !== id);
// };

// return { count, tasks, addTask, removeTask };
</script>

<template>
  <section>
    <div class="container">
      <div class="column">
        <h3 class="column__title">No Status</h3>
        <label>
          <!-- <input type="text" v-model.trim="taskName" @keydown.enter="addTask" /> -->
          <button @click="openForm">Add todo</button>
        </label>
        <div v-if="formIsOpen" class="column__item--form">
          <form type="submit" ref="form" @submit.prevent="addItem">
            <div class="forms">
              <label for="taskName">Task name</label>
              <input type="text" id="taskName" v-model="formData.taskName" />
              <label for="taskDescribe">Describe</label>
              <input
                type="text"
                id="taskDescribe"
                v-model="formData.taskDesribe"
              />
              <label>Priority</label>
              <select v-model="formData.taskPriority">
                <option>Priority 1</option>
                <option>Priority 2</option>
                <option>Priority 3</option>
              </select>
            </div>
            <button>Button</button>
          </form>
        </div>
        <draggable
          v-else
          v-model="tasks"
          tag="ul"
          item-key="id"
          class="column__list"
          drag-class="drag"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item
              :id="task.id"
              :taskName="task.taskName"
              :taskDescribe="task.taskDescribe"
              class="column__item"
              >{{ task.taskName }}
            </app-task-item>
          </template>
        </draggable>
      </div>
      <div class="column">
        <h3 class="column__title">Not started</h3>
        <ul class="column__list"></ul>
      </div>
      <div class="column">
        <h3 class="column__title">In progress</h3>
        <ul class="column__list"></ul>
      </div>
      <div class="column">
        <h3 class="column__title">Completed</h3>
        <ul class="column__list"></ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.ghost {
  background: rgb(231, 231, 231);
}

.column__item--form {
  display: flex;
  .forms {
    display: flex;
    flex-direction: column;
  }
}
</style>
