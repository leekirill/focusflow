<script setup>
import { ref, computed } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

const props = defineProps([
  "id",
  "name",
  "description",
  "priority",
  "editMode",
  "checked",
  "handleEditMode",
]);
console.log(
  props.id,
  props.name,
  props.description,
  props.priority,
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
    <template #title>
      <div class="flex align-items-center">
        <input id="checkbox" type="checkbox" />
        <label for="checkbox" class="ml-2"> <slot /> </label>
      </div>
    </template>

    <template #content>
      <div class="item__bottom">
        <label>
          {{ props.description && "Description:" }}
          <span>{{ props.description }}</span>
        </label>
        <div>
          <span>{{ getCurrentDate }}</span>
          <span>{{ taskPriority }}</span>
        </div>
      </div>
    </template>
    <template #footer>
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
