<script setup>
import { ref, computed, watchEffect, onMounted } from "vue";

import draggable from "vuedraggable";
import AppTaskItem from "../components/AppTaskItem.vue";
import AppModal from "../components/AppModal.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Menu from "primevue/menu";

import image from "../assets/rest-image.svg";

import { useToast } from "primevue/usetoast";
const toast = useToast();

let columns = ref([[], [], [], []]);
let titles = ref(["No completed", "No started", "In progress", "Done"]);
let formIsOpen = ref(false);
let editMode = ref(false);
let errorClass = ref("");
let searchValue = ref("");
let selectedSortingName = ref({ name: "desc", id: 0 });
let sorteredColumn = ref();
let sortingItems = ref([
  {
    label: "desc",
    command: () => {
      selectedSortingName.value.id = 0;
      selectedSortingName.value.name = "desc";
      columns.value[sorteredColumn.value] = [
        ...columns.value[sorteredColumn.value],
      ].sort((a, b) => b.name.localeCompare(a.name));
    },
  },
  {
    label: "asc",
    command: () => {
      selectedSortingName.value.id = 1;
      selectedSortingName.value.name = "asc";
      columns.value[sorteredColumn.value] = [
        ...columns.value[sorteredColumn.value],
      ].sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  {
    label: "priority desc",
    command: () => {
      selectedSortingName.value.id = 1;
      selectedSortingName.value.name = "asc";
      columns.value[sorteredColumn.value] = [
        ...columns[sorteredColumn.value],
      ].sort((a, b) => a.priority.id - b.priority.id);
    },
  },
  {
    label: "priority asc",
    command: () => {
      selectedSortingName.value.id = 1;
      selectedSortingName.value.name = "asc";
      columns.value[sorteredColumn.value] = [
        ...columns[sorteredColumn.value],
      ].sort((a, b) => b.priority.id - a.priority.id);
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
  columns.value.map((column, index) => {
    column.map((item) => {
      if (item.id === id) {
        moveTask(item, id, index);
        // item.completed = !item.completed;
      }
    });
  });

  function moveTask(task, taskId, columnId) {
    if (!task.completed) {
      columns.value[columnId] = columns.value[columnId].filter(
        (item) => item.id !== taskId
      );
      columns.value[columns.value.length - 1].unshift(task);
    } else {
      columns.value[columns.value.length - 1] = columns.value[columnId].filter(
        (item) => item.id !== taskId
      );
      columns.value[task.columnNumber].unshift(task);
    }
  }
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

// const replaceCompletedTask = (id) => {
//   columns.value = columns.value.map((column) => {
//     return column.filter((items) => {
//       if (items.id === id) {
//         console.log(column);
//         return columns.value[columns.value.length - 1].unshift(items);
//       }
//     });
//   });
// };

// Сортировка

//// хендлер меню

const button = ref();
const menu = ref();
const toggle = (event) => {
  // console.log(menu.value[0])
  menu.value.forEach((column, i) => {
    column.toggle(event);
  });

  if (event.target.nodeName === "BUTTON") {
    sorteredColumn.value = Number(event.target.ariaLabel);
  } else {
    return;
  }
};

const isThereAnySortableTask = () => {
  return columns.value.map((column, i) => console.log(i, column.length));
};

// const catchColumnId()

// Поиск

const handleValue = (value) => {
  searchValue.value = value;
};

const filteredArr = computed(() => {
  const filtered = columns.value.map((column) =>
    column.filter((items) => {
      if (items.name.includes(searchValue.value)) {
        console.log(items.name + "+");
        return items;
      }
    })
  );
  return filtered;
});

// Replace item if it completed

watchEffect(() => {
  for (let i = 0; i < columns.value.length - 1; i++) {
    columns.value[i].forEach((items) => {
      items.completed = false;
      items.columnNumber = i;
    });
    columns.value[columns.value.length - 1].forEach((items) => {
      items.completed = true;
    });
  }
});

// const filteredArr = (arr, value) => {
//   return arr.filter((items) => {
//     if (items.name.toLowerCase().includes(value.toLowerCase())) {
//       console.log(items.name + "+");
//       return items;
//     } else {
//       items = {};
//     }
//   });
// };
const isThereAnyTask = computed(() => {
  return columns.value.some((column) => {
    return column.length;
  });
});
onMounted(() => {
  selectedSortingName.value.name = "";
});
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
    <div v-if="isThereAnyTask" class="panel">
      <div class="panel__header">
        <Button label="Add task" icon="pi pi-plus" @click="handleModal" />
        <div class="flex gap-3">
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText @input="handle" placeholder="Search" />
          </span>
          <Toast />
        </div>
      </div>
      <div class="container">
        <div class="column" v-for="(column, i) in columns" :key="i">
          <div class="flex align-items-baseline justify-content-between">
            <h4 class="column__heading">{{ titles[i] }}</h4>
            <div class="card flex justify-content-center align-items-center">
              <Button
                ref="button"
                type="button"
                icon="pi pi-sort-amount-up"
                @click="toggle"
                aria-haspopup="true"
                aria-controls="overlay_menu"
                :aria-label="i"
                :disabled="column.length < 1"
                link
              />
              <Menu ref="menu" :model="sortingItems" :popup="true" />
            </div>
          </div>
          <draggable
            :list="column"
            :itemKey="String(i)"
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
                :checkedArr="checkedArr"
              >
              </app-task-item>
            </template>
          </draggable>
        </div>
      </div>
    </div>
    <div v-else class="p-6 border-round-2xl text-center bg-white">
      <div class="mb-5">
        <img :src="image" width="600" />
        <h1 class="text-center">You don't have any task</h1>
      </div>
      <Button label="Add task" icon="pi pi-plus" @click="handleModal" />
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
