<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import AppTaskItem from "./components/AppTaskItem.vue";

let tasks = ref([]);
let taskName = ref("");

// Добавляем задачу

const addTask = () => {
  if (taskName.value === "") {
    alert("Title your task");
    return;
  }
  const newTask = {
    id: Math.floor(Math.random() * 100),
    name: taskName.value,
  };
  tasks.value.push(newTask);
  taskName.value = "";
};

// Редактируем задачу

const saveEditedTaskName = (id, value) => {
  tasks.value.filter((task) => {
    if (task.id === id) {
      task.name = value;
    }
  });
};

// Удаляем задачу

const removeTask = (id) => {
  return (tasks.value = tasks.value.filter((task) => task.id !== id));
};

// return { count, tasks, addTask, removeTask };
</script>

<template>
  <section>
    <div class="container">
      <div class="column">
        <h3 class="column__title">No Status</h3>
        <label>
          <input type="text" v-model.trim="taskName" @keydown.enter="addTask" />
          <button @click="addTask">Add todo</button>
        </label>
        <draggable
          v-model="tasks"
          tag="ul"
          item-key="id"
          class="column__list"
          drag-class="drag"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item
              :edit="edit"
              :saveEditedTaskName="saveEditedTaskName"
              :taskName="task.name"
              :id="task.id"
              class="column__item"
              >{{ task.name }}
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

<style scoped>
.drag {
  transform: rotate(10deg);
}
.ghost {
  background: rgb(231, 231, 231);
}
</style>
