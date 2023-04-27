<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

const props = defineProps(["formIsOpen", "formData", "addItem", "errorClass"]);

let priority = ref([{ name: "High" }, { name: "Medium" }, { name: "Low" }]);

console.log(props.formIsOpen);
</script>

<template>
  <Dialog
    header="New task"
    v-model:visible="props.formIsOpen"
    modal
    :breakpoints="{ '960px': '75vw', '641px': '80vw' }"
    :style="{ width: '50vw' }"
  >
    <div class="flex flex-column gap-4">
      <div class="flex flex-column gap-2">
        <label for="name">Task Name</label>
        <InputText
          id="name"
          v-model="formData.name"
          aria-describedby="task-name"
          :class="errorClass"
        />
        <small id="task-name" v-show="errorClass">Error</small>
      </div>
      <div class="flex flex-column gap-2">
        <label for="description">Description</label>
        <Textarea id="description" v-model="formData.description" />
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
      <Button label="Add task" @click="addItem" />
    </template>
  </Dialog>
</template>
