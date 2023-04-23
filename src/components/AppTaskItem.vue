<script setup>
import { ref, computed } from "vue";

const props = defineProps([
  "id",
  "taskName",
  "taskDescription",
  "taskPriority",
  "editMode",
  "checked",
  "handleEditMode",
]);
console.log(
  props.id,
  props.taskName,
  props.taskDescription,
  props.taskPriority,
  props.editMode,
  props.checked,
  props.handleEditMode
);

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
  <li>
    <label><input type="checkbox" id="checkbox" /><slot /></label>
    <button @click="handleEditMode(id)">Edit</button>
    <button @click="removeTask(id)">Remove</button>
    <div class="item__bottom">
      <label>
        {{ props.taskDescription && "Description:" }}
        <span>{{ props.taskDescription }}</span>
      </label>
      <div>
        <span>{{ getCurrentDate }}</span>
        <span>{{ taskPriority }}</span>
      </div>
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
}
.item__bottom {
  display: flex;
  flex-direction: column;
  div {
    display: inherit;
    justify-content: space-between;
  }
}
</style>
