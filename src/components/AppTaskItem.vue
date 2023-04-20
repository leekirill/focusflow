<script setup>
import { ref } from "vue";

const props = defineProps([
  "id",
  "taskName",
  "editMode",
  "handleEditMode",
  "saveEditedTaskName",
  "removeTask",
]);

// let editMode = ref(false);
let editedTaskName = ref("");

const handleInput = (e) => {
  editedTaskName.value = e.target.value;
};
</script>

<template>
  <li v-if="editMode">
    <label for="edit">
      <input type="text" :value="props.taskName" @input="handleInput" />
      <button @click="saveEditedTaskName(id, editedTaskName)">Save me</button>
    </label>
  </li>
  <li v-else>
    <label><input type="checkbox" id="checkbox" /><slot /></label>
    <button @click="handleEditMode(id)">Edit</button>
    <button @click="removeTask(id)">Remove</button>
    <label>
      Add some description
      <input type="textarea" />
    </label>
  </li>
</template>

<style scoped lang="scss">
li {
  background-color: #fff;
  &:hover,
  &:active {
    cursor: pointer;
  }
}
</style>
