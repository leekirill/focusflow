<script setup>
import { ref, computed } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";

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
  <Card>
    <input type="checkbox" id="checkbox" />
    <template #title
      ><label for="checkbox"><slot /></label
    ></template>

    <template #content>
      <Button
        label="Edit"
        severity="secondary"
        outlined
        @click="handleEditMode(id)"
      ></Button>
      <Button
        label="Remove"
        severity="danger"
        text
        @click="removeTask(id)"
      ></Button>
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
    </template>
  </Card>
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
