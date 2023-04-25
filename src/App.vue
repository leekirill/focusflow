<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";
import AppTaskItem from "./components/AppTaskItem.vue";

// import Button from "primevue/button";

let columns = ref([
  [
    { name: "John", id: 1 },
    { name: "Ivan", id: 2 },
  ],
  [{ name: "Joe", id: 3 }],
  [],
  [],
]);
let tasks = ref([]);
let formIsOpen = ref(false);
let editMode = ref(false);
let formData = ref({
  taskName: null,
  taskDescription: null,
  taskPriority: null,
});
// Добавляем задачу

const openForm = () => {
  formIsOpen.value = !formIsOpen.value;
};

const addItem = () => {
  columns.value[0].push({ name: "Newbie", id: 3 });
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
};

// Редактируем задачу

// const handleEditForm = (id) => {
//   formIsOpen.value = !formIsOpen.value
//   console.log(id)
// }

const handleEditMode = (id) => {
  formIsOpen.value = !formIsOpen.value;
  editMode.value = !editMode.value;
  tasks.value.filter((task) => {
    if (task.id === id) {
      formData.value.taskName = task.taskName;
      formData.value.taskDescription = task.taskDescription;
      formData.value.taskPriority = task.taskPriority;
    }
  });
  // tasks.value.filter((task) => {
  //   if (task.id === id) {
  //     task.editMode = !task.editMode;
  //   }
  // });
};

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
            <app-task-item class="column__item"
              >{{ task.name }} {{ task.id }}
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
            <app-task-item class="column__item"
              >{{ task.name }} {{ task.id }}
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
          class="column"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item class="column__item"
              >{{ task.name }} {{ task.id }}
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
          class="column"
          ghost-class="ghost"
        >
          <template #item="{ element: task }">
            <app-task-item class="column__item"
              >{{ task.name }} {{ task.id }}
            </app-task-item>
          </template>
        </draggable>
      </div>
    </div>
    <button @click="addItem">Add task</button>

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
.ghost {
  background: rgb(231, 231, 231);
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
