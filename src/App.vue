<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import AppTaskItem from "./components/AppTaskItem.vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";

let columns = ref([[], [], [], []]);
let tasks = ref([]);
let formIsOpen = ref(false);
let editMode = ref(false);
let priority = ref([{ name: "High" }, { name: "Medium" }, { name: "Low" }]);
let formData = ref({
  name: null,
  description: null,
  priority: null,
});
// Добавляем задачу

const openForm = () => {
  formIsOpen.value = !formIsOpen.value;
};

const addItem = () => {
  columns.value[0].unshift({
    name: formData.value.name,
    description: formData.value.description,
    priority: formData.value.priority,
    id: Math.floor(Math.random() * 100),
  });
  formData.value = {
    name: null,
    description: null,
    priority: null,
  };
  formIsOpen.value = !formIsOpen.value;
};
// Валидаци полей
// if (formData.value.taskName === null) {
//   alert("Fill the inputs");
//   return;
// }
// const newTask = {
//   id: Math.floor(Math.random() * 100),
//   taskName: formData.value.taskName,
//   taskDescription: formData.value.taskDescription,
//   taskPriority: formData.value.taskPriority,
//   editMode: false,
//   checked: false,
// };
// if (editMode.value) {
//   console.log(123);
// }
// columns.value[0].unshift(newTask);
// console.log(columns.value[0]);
// formData.value.taskName = null;
// formData.value.taskDescription = null;
// formData.value.taskPriority = null;
// formIsOpen.value = !formIsOpen.value;

// Редактируем задачу

// const handleEditForm = (id) => {
//   formIsOpen.value = !formIsOpen.value
//   console.log(id)
// }

// const handleEditMode = (id) => {
//   formIsOpen.value = !formIsOpen.value;
//   editMode.value = !editMode.value;
//   tasks.value.filter((task) => {
//     if (task.id === id) {
//       formData.value.taskName = task.taskName;
//       formData.value.taskDescription = task.taskDescription;
//       formData.value.taskPriority = task.taskPriority;
//     }
// });
// tasks.value.filter((task) => {
//   if (task.id === id) {
//     task.editMode = !task.editMode;
//   }
// });
// };

// const saveEditedTaskName = (id, value) => {
//   tasks.value.filter((task) => {
//     if (task.id === id) {
//       task.name = value;
//       task.editMode = !task.editMode;
//     }
//   });
// };

// Удаляем задачу

// const removeTask = (id) => {
//   tasks.value = tasks.value.filter((task) => task.id !== id);
// };

// return { count, tasks, addTask, removeTask };
</script>

<template>
  <Button label="Add task" @click="openForm" />

  <section>
    <teleport to="body">
      <Dialog
        header="New task"
        v-model:visible="formIsOpen"
        modal
        :breakpoints="{ '960px': '75vw', '641px': '80vw' }"
        :style="{ width: '50vw' }"
      >
        <div class="flex flex-column gap-4">
          <label for="name">Task Name</label>
          <InputText
            id="name"
            v-model="formData.name"
            aria-describedby="task-name"
          />
          <label for="description">Description</label>
          <Textarea id="description" v-model="formData.description" />
          <Dropdown
            v-model="formData.priority"
            :options="priority"
            optionLabel="name"
            placeholder="Select a Priopity"
            class="w-full md:w-14rem"
          />

          <!-- <small id="task-name"
            >Enter your username to reset your password.</small
          > -->
        </div>
        <template #footer>
          <Button label="Add task" @click="addItem" />
        </template>
      </Dialog>
    </teleport>
    <div class="container">
      <div class="column">
        <h3>No Started</h3>
        <draggable
          :list="columns[0]"
          :itemKey="id"
          group="tasks"
          tag="ul"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item
              class="column__item"
              :description="task.description"
              :priority="task.priority.name"
              >{{ task.name }}
            </app-task-item>
          </template>
        </draggable>
      </div>
      <div class="column">
        <h3>No Completed</h3>
        <draggable
          :list="columns[1]"
          :itemKey="id"
          group="tasks"
          tag="ul"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item class="column__item" :description="task.description"
              >{{ task.name }}
            </app-task-item>
          </template>
        </draggable>
      </div>
      <div class="column">
        <h3>In Progress</h3>
        <draggable
          :list="columns[2]"
          :itemKey="id"
          group="tasks"
          tag="ul"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item class="column__item" :description="task.description"
              >{{ task.name }}
            </app-task-item>
          </template>
        </draggable>
      </div>
      <div class="column">
        <h3>Done</h3>
        <draggable
          :list="columns[3]"
          :itemKey="id"
          group="tasks"
          tag="ul"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item class="column__item" :description="task.description"
              >{{ task.name }}
            </app-task-item>
          </template>
        </draggable>
      </div>
    </div>
    <!-- <div class="column">
        <h3 class="column__title">No Status</h3>
        <label>
         <input type="text" v-model.trim="taskName" @keydown.enter="addTask" /> -->
    <!-- <button @click="openForm">
            {{ formIsOpen ? "Close" : "Add todo" }}
          </button>
        </label>
        <div class="column__item--form" v-show="formIsOpen">
          <form type="submit" @submit.prevent="addItem">
            <div class="forms">
              <label for="taskName">Task name</label>
              <input type="text" id="taskName" v-model="formData.taskName" />
              <label for="taskDescription">Description</label>
              <textarea
                id="taskDescription"
                v-model="formData.taskDescription"
              />
              <label>Priority</label>
              <select v-model="formData.taskPriority">
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
              </select>
            </div>
            <button>Button</button>
          </form>
        </div> -->

    <!-- <draggable
          v-model="columns[1]"
          tag="ul"
          item-key="id"
          class="column__list"
          drag-class="drag"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item
              class="column__item"
              :id="task.id"
              :taskName="task.taskName"
              :taskDescription="task.taskDescription"
              :taskPriority="task.taskPriority"
              :editMode="task.editMode"
              :checked="task.checked"
              >{{ task.taskName }}
            </app-task-item>
          </template>
        </draggable> -->
    <!-- </div> -->

    <!-- <div class="column">
        <h3 class="column__title">Not started</h3>
        <ul class="column__list"></ul>
      </div>
      <div class="column">
        <h3 class="column__title">In progress</h3>
        <ul class="column__list"></ul>
      </div>
      <div class="column">
        <h3 class="column__title">Completed</h3>
        <ul class="column__list"></ul>
      </div> -->
    <!-- </div> -->
  </section>
</template>

<style scoped lang="scss">
ul {
  height: 100%;
}

form {
  display: flex;
  flex-direction: column;
  width: 500px;
  padding: 40px;
  background: #fff;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.ghost {
  background: rgb(231, 231, 231);
}
.column {
  padding: 20px;
}
.column__item--form {
  display: flex;
  padding: 10px;
  border: 1px solid #bbbbbb;
  .forms {
    display: flex;
    flex-direction: column;
  }
}
</style>
