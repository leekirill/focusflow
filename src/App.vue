<script setup>
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import AppTaskItem from "./components/AppTaskItem.vue";
import AppModal from "./components/AppModal.vue";
import Button from "primevue/button";
import Toast from "primevue/toast";

import { useToast } from "primevue/usetoast";

const toast = useToast();

let columns = ref([[], [], [], []]);
let formIsOpen = ref(false);
let editMode = ref(false);
let errorClass = ref("");
let formData = ref({
  name: "",
  description: "",
  priority: {},
  editMode: false,
  completed: false,
});
// Добавляем задачу

const openForm = () => {
  errorClass.value = "";
  formIsOpen.value = !formIsOpen.value;
};

const addItem = () => {
  // Валидаци поля name

  if (formData.value.name.length === 0) {
    errorClass.value = "p-invalid";
    const message = () => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Please fill the inputs",
        life: 3000,
      });
    };
    message();
    return;
  }

  // Объект задачи

  let newTask = {
    id: Math.floor(Math.random() * 100),
    name: formData.value.name,
    description: formData.value.description,
    priority: formData.value.priority,
    editMode: false,
    completed: false,
  };

  columns.value[0].unshift(newTask);

  formData.value = {
    name: "",
    description: "",
    priority: {},
    editMode: false,
    completed: false,
  };

  formIsOpen.value = !formIsOpen.value;
};

// Отмечаем задачу

const updateTask = (id) => {
  columns.value.forEach((column) => {
    column.filter((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
    });
  });
};

// Удаляем задачу

const removeTask = (id) => {
  columns.value = columns.value.map((column) => {
    return column.filter((items) => items.id !== id);
  });
};

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

// return { count, tasks, addTask, removeTask };
</script>

<template>
  <Button label="Add task" @click="openForm" />
  <Toast />
  <teleport to="body">
    <AppModal
      :formIsOpen="formIsOpen"
      :formData="formData"
      :errorClass="errorClass"
      :addItem="addItem"
    />
  </teleport>
  <section>
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
              :id="task.id"
              :name="task.name"
              :description="task.description"
              :priority="task.priority.name"
              :completed="task.completed"
              :updateTask="updateTask"
              :removeTask="removeTask"
            >
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
            <app-task-item :description="task.description"
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
            <app-task-item :description="task.description"
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
            <app-task-item :description="task.description"
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

h3 {
  margin: 0 0 20px 0;
  text-align: center;
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
  ul {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
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
