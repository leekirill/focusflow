<script setup>
import { ref, computed } from "vue";

const props = defineProps(["id", "taskName", "taskDescribe"]);

// let editMode = ref(false);
let editedTaskName = ref("");

const handleInput = (e) => {
  editedTaskName.value = e.target.value;
};

const getCurrentDate = computed(() => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  let today = new Date();
  return today.toLocaleDateString("en-US", options);
});
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
    <div>
      <div v-if="isEditMode">{{ taskDescribe }}</div>
      <label v-else class="descibe">
        Add some description
        <input type="textarea" />
      </label>
      <span>{{ getCurrentDate }}</span>
    </div>
  </li>
</template>

<style scoped lang="scss">
li {
  background-color: #fff;
  &:hover,
  &:active {
    cursor: pointer;
  }
  .descibe {
    display: flex;
    flex-direction: column;
  }
}
</style>
