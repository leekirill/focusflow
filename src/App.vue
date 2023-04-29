<script setup>
import {
  ref,
  computed,
  onMounted,
  onUpdated,
  watchEffect,
  defineComponent,
} from "vue";

import draggable from "vuedraggable";
import AppTaskItem from "./components/AppTaskItem.vue";
import AppModal from "./components/AppModal.vue";
import AppHeader from "./components/AppHeader.vue";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Menu from "primevue/menu";

import { useToast } from "primevue/usetoast";
const toast = useToast();

let columns = ref([[], [], [], []]);
let formIsOpen = ref(false);
let editMode = ref(false);
let errorClass = ref("");
let searchValue = ref("");
let selectedSortingName = ref({ name: "desc", id: 0 });
let sortingItems = ref([
  {
    label: "desc",
    command: () => {
      selectedSortingName.value.id = 0;
      selectedSortingName.value.name = "desc";
      columns.value = columns.value.map((column) => {
        return column.sort((a, b) => a.name.localeCompare(b.name));
      });
    },
  },
  {
    label: "asc",
    command: () => {
      selectedSortingName.value.id = 1;
      selectedSortingName.value.name = "asc";
      columns.value = columns.value.map((column) => {
        return column.sort((a, b) => b.name.localeCompare(a.name));
      });
    },
  },
]);

let formData = ref({
  name: "",
  description: "",
  priority: {},
  completed: false,
});

// Добавляем задачу

const handleModal = () => {
  errorClass.value = "";
  formIsOpen.value = !formIsOpen.value;
};

const addItem = () => {
  if (editMode === true) {
    editMode.value = !editMode.value;
  }
  // editMode.value = !editMode.value;
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
    id: String(Math.floor(Math.random() * 100)),
    name: formData.value.name,
    description: formData.value.description,
    priority: formData.value.priority,
    completed: false,
  };

  columns.value[0].unshift(newTask);

  formData.value = {
    name: "",
    description: "",
    priority: {},
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

  // replaceCompletedTask(id);
};

// Удаляем задачу

const removeTask = (id) => {
  columns.value = columns.value.map((column) => {
    return column.filter((items) => items.id !== id);
  });
};

// Редактируем задачу

const handleEditForm = (id) => {
  formIsOpen.value = !formIsOpen.value;
  editMode.value = true;
  columns.value.map((column) => {
    return column.filter((items) => {
      if (items.id === id) {
        formData.value.id = items.id;
        formData.value.name = items.name;
        formData.value.description = items.description;
        formData.value.priority = items.priority;
        formData.value.editMode = true;
      }
    });
  });
};

const saveEditedTaskName = () => {
  columns.value.map((column) => {
    column.find((items) => {
      if (formData.value.id === items.id) {
        console.log(items.name, formData.value.name);
        items.name = formData.value.name;
        items.description = formData.value.description;
        items.priority = formData.value.priority;
      }
    });
  });

  editMode.value = false;
  formData.value = {
    name: "",
    description: "",
    priority: {},
    editMode: false,
    completed: false,
  };
  formIsOpen.value = !formIsOpen.value;
};

// Completed когда в Done

watchEffect(() => {
  for (let i = 0; i < columns.value.length - 1; i++) {
    columns.value[i].map((items) => {
      items.completed = false;
    });
  }
  columns.value[3].map((items) => {
    items.completed = true;
  });

  // columns.value[3].map((column) => {
  //   column.completed = true;
  // });
});

// const replaceCompletedTask = (id) => {
//   columns.value = columns.value.map((column) => {
//     return column.filter((items) => {
//       if (items.id === id) {
//         console.log(column);
//         return columns.value[3].unshift(items);
//       }
//     });
//   });
// };

// Сортировка

//// хендлер меню

const menu = ref();
const toggle = (event) => {
  menu.value.toggle(event);
  console.log(menu.value);
};

const handleValue = (value) => {
  searchValue.value = value;

  columns.value = columns.value.map((column) => {
    console.log(column);
  });
};
</script>

<template>
  <AppHeader :handleValue="handleValue" />
  <Toast />

  <teleport to="body">
    <AppModal
      :formIsOpen="formIsOpen"
      :formData="formData"
      :errorClass="errorClass"
      :addItem="addItem"
      :editMode="editMode"
      :saveEditedTaskName="saveEditedTaskName"
    />
  </teleport>
  <section>
    <div class="panel">
      <div class="panel__header">
        <Button label="Add task" icon="pi pi-plus" @click="handleModal" />
        <!-- <div class="card flex justify-content-center">
            <Menu :model="sortingItems" label="name" />
          </div> -->
        <div class="card flex justify-content-center align-items-center">
          <span>Sorting by: </span>
          <Button
            type="button"
            :label="selectedSortingName.name"
            @click="toggle"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            link
          />
          <Menu ref="menu" :id="id" :model="sortingItems" :popup="true" />
          <Toast />
        </div>
        <!-- <span>Sorting</span> -->
      </div>
      <div class="container">
        <div class="column">
          <h4>No Started</h4>
          <draggable
            :list="columns[0]"
            itemKey="id"
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
                :editTask="handleEditForm"
              >
              </app-task-item>
            </template>
          </draggable>
        </div>
        <div class="column">
          <h4>No Completed</h4>
          <draggable
            :list="columns[1]"
            itemKey="id"
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
                :editTask="handleEditForm"
              >
              </app-task-item>
            </template>
          </draggable>
        </div>
        <div class="column">
          <h4>In Progress</h4>
          <draggable
            :list="columns[2]"
            itemKey="id"
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
                :editTask="handleEditForm"
              >
              </app-task-item>
            </template>
          </draggable>
        </div>
        <div class="column">
          <h4>Done</h4>
          <draggable
            :list="columns[3]"
            itemKey="id"
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
                :editTask="handleEditForm"
              >
              </app-task-item>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
ul {
  height: 100%;
}

h4 {
  margin: 0 0 20px 0;
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
  padding: 0px 30px 30px 30px;
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
