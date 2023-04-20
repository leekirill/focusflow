<script setup>
import { ref } from "vue";

let count = ref(0);
let tasks = ref([]);

const addTask = () => {
  count.value += 1;
  const newTask = {
    id: Math.floor(Math.random() * 100),
    name: `Task ${count.value}`,
  };
  tasks.value.push(newTask);
};

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
        <ul class="column__list">
          <button @click="addTask">Add todo</button>
          <li class="column__item" v-for="(task, i) in tasks" :key="i">
            {{ task.name }}
            <button @click="removeTask(task.id)">Remove</button>
          </li>
        </ul>
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

<style scoped></style>
