<script setup>
import { ref } from "vue";

const props = defineProps(["id", "taskName", "saveEditedTaskName"]);

let editMode = ref(false);
let editedTaskName = ref("");

const handleEditMode = () => {
  editMode.value = !editMode.value;
};
const handleInput = (e) => {
  editedTaskName.value = e.target.value;
};
const saveEditedTaskName = () => {
  editMode.value = !editMode.value;
};
</script>

<template>
  {{ editMode }}
  <li v-if="editMode">
    <label for="edit">
      <input type="text" :value="props.taskName" @input="handleInput" />
      <button @click="saveEditedTaskName(id, editedTaskName)">Save me</button>
    </label>
  </li>
  <li v-else>
    <label><input type="checkbox" id="checkbox" /><slot /></label>
    <button @click="handleEditMode">Edit</button>
    <button>Remove</button>
  </li>
</template>

<style scoped></style>
