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
  "editTask",
]);

let completed = ref();

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

// Время

let getCurrentDate = computed(() => {
  let options = {
    weekday: "long",
    month: "long",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
  };
  let today = new Date();
  return today.toLocaleDateString("en-US", options);
});

const isTaskDone = computed(() => {
  return props.completed ? "checked" : "ml-2";
});
</script>

<template>
  <Card class="card">
    <template #title>
      <div class="flex align-items-center">
        <!-- <label :class="isTaskDone"> -->
        <!-- <input
            id="checkbox"
            type="checkbox"
            :checked="completed"
            @input="updateTask(id)"
          /> -->
        <Checkbox
          v-model="completed"
          :inputId="id"
          :value="id"
          @input="updateTask(id)"
        />
        <label :for="id" :class="`${isTaskDone} ml-2`"> {{ props.name }}</label>

        <!-- </label> -->
      </div>
    </template>

    <template #content>
      <p>{{ props.description }}</p>
      <Tag v-show="priority" :value="priority" :severity="tagColor" />
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
            @click="editTask(id)"
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
  opacity: 0.4;
}
.card {
  cursor: pointer;
}
// .item__bottom {
//   flex-direction: column;
//   div {
//     display: inherit;
//     justify-content: space-between;
//   }
// }
</style>
