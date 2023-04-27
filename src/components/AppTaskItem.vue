<script setup>
import { ref, computed } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Tag from "primevue/tag";

const props = defineProps([
  "id",
  "name",
  "description",
  "priority",
  "completed",
  "updateTask",
  "removeTask",
]);

const tagColor = computed(() => {
  switch (props.priority) {
    case "High": {
      return "danger";
    }
    case "Medium": {
      return "warning";
    }
    case "Low": {
      return "info";
    }
    default: {
      break;
    }
  }
});
// console.log(
//   props.id,
//   props.name,
//   props.description,
//   props.priority,
//   props.editMode,
//   props.checked,
//   props.handleEditMode,
//   props.updateTask
// );

// Время

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

const isTaskDone = computed(() => {
  return props.completed ? "checked" : "";
});
</script>

<template>
  <Card>
    <template #title>
      <div class="flex align-items-center">
        <label :class="isTaskDone">
          <input
            id="checkbox"
            type="checkbox"
            :checked="completed"
            @input="updateTask(id)"
          />
          {{ props.name }}</label
        >
      </div>
    </template>

    <template #content>
      <div class="item__bottom">
        <p>{{ props.description }}</p>
        <div>
          <Tag v-show="priority" :value="priority" :severity="tagColor" />
        </div>
      </div>
    </template>
    <template #footer>
      <div
        class="flex justify-content-between align-items-center flex-row-reverse"
      >
        <div class="flex flex-row">
          <Button
            icon="pi pi-pencil"
            severity="secondary"
            text
            rounded
            aria-label="Edit"
            @click="handleEditMode(id)"
          ></Button>
          <Button
            icon="pi pi-trash"
            severity="danger"
            text
            rounded
            aria-label="Remove"
            @click="removeTask(id)"
          ></Button>
        </div>
        <small>{{ getCurrentDate }}</small>
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

.checked {
  text-decoration: line-through;
}
// .item__bottom {
//   flex-direction: column;
//   div {
//     display: inherit;
//     justify-content: space-between;
//   }
// }
</style>
