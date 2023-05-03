<script setup>
import { ref, computed } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const props = defineProps([
  "formIsOpen",
  "formData",
  "addItem",
  "errorClass",
  "editMode",
  "saveEditedTaskName",
]);

let priority = ref([
  { name: "High", id: 3 },
  { name: "Medium", id: 2 },
  { name: "Low", id: 1 },
]);

const editTitle = computed(() => (props.editMode ? "Edit" : "New task"));
</script>

<template>
  <Dialog
    :header="editTitle"
    :visible="formIsOpen"
    :breakpoints="{ '960px': '75vw', '641px': '80vw' }"
    :style="{ width: '50vw' }"
    modal
  >
    <div class="flex flex-column gap-4">
      <div class="flex flex-column gap-2">
        <label for="name">Task Name</label>
        <InputText
          v-if="editMode"
          id="name"
          v-model="formData.name"
          aria-describedby="task-name"
          :class="errorClass"
          @keydown.enter="saveEditedTaskName"
          autofocus
        />
        <InputText
          v-else
          id="name"
          v-model="formData.name"
          aria-describedby="task-name"
          :class="errorClass"
          @keydown.enter="addItem"
          autofocus
        />
      </div>
      <div class="flex flex-column gap-2">
        <label for="description">Description</label>
        <Textarea id="description" v-model="formData.description" rows="10" />
      </div>

      <Dropdown
        v-model="formData.priority"
        :options="priority"
        optionLabel="name"
        placeholder="Priopity"
        class="w-full md:w-14rem"
      />
    </div>

    <template #footer>
      <Button
        v-if="editMode"
        label="Save"
        icon="pi pi-check"
        @click="saveEditedTaskName"
      />
      <Button v-else label="Add task" icon="pi pi-plus" @click="addItem" />
    </template>
  </Dialog>
</template>
