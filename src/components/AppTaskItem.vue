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
  "status",
]);

// console.log("props в карте задачи: " + props.completed);

const checked = computed(() => {
  return props.completed || props.status === 3 ? true : false;
});
const setCompleteClass = computed(() => {
  return props.completed || props.status === 3 ? "completed" : "card";
});

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
</script>

<template>
  <Card :class="setCompleteClass">
    <template #title>
      <div class="flex align-items-center">
        <Checkbox
          :model-value="checked"
          :inputId="id"
          :value="id"
          binary="true"
          @input="updateTask(id)"
        />
        <label class="ml-2" :for="id"> {{ props.name }}</label>
      </div>
    </template>
    <template #content>
      {{ props.status }}
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
.p-card .p-card-content {
  margin: 0;
  padding: 0;
}
p {
  margin: 0;
  padding: 0;
}

li {
  background-color: #fff;
  &:hover,
  &:active {
    cursor: pointer;
  }
}

.checked {
  opacity: 0.5;
}
.card {
  cursor: pointer;
}
.completed {
  opacity: 0.5;
  label {
    text-decoration: line-through;
    color: #9f9f9f;
  }
}
// .item__bottom {
//   flex-direction: column;
//   div {
//     display: inherit;
//     justify-content: space-between;
//   }
// }
</style>
