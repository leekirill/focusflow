<script setup>
import { ref, computed, watch, onMounted } from "vue";

import draggable from "vuedraggable";
import AppTaskItem from "../components/AppTaskItem.vue";
import AppModal from "../components/AppModal.vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import Menu from "primevue/menu";
import ProgressSpinner from "primevue/progressspinner";

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
      console.log(sorteredColumn.value);
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
      selectedSortingName.value.name = "desc";
      console.log(columns.value[sorteredColumn.value]);
      columns.value[sorteredColumn.value] = [
        ...columns.value[sorteredColumn.value],
      ].sort((a, b) => a.priority.id - b.priority.id);
    },
  },
  {
    label: "priority asc",
    command: () => {
      selectedSortingName.value.id = 1;
      selectedSortingName.value.name = "asc";
      columns.value[sorteredColumn.value] = [
        ...columns.value[sorteredColumn.value],
      ].sort((a, b) => b.priority.id - a.priority.id);
    },
  },
]);
let isLoading = ref(false);

let formData = ref({
  name: "",
  description: "",
  priority: {},
  completed: false,
  status: 0,
});

const getData = async () => {
  isLoading.value = !isLoading.value;

  const res = await fetch("https://640dc3a6b07afc3b0db57282.mockapi.io/todos");
  const data = await res.json();
  // console.log(data);

  data.map((item) => {
    console.log(item.status);
    columns.value[item.status].unshift(item);
  });

  isLoading.value = !isLoading.value;
};

onMounted(() => getData());

// Добавляем задачу

const handleModal = () => {
  errorClass.value = "";
  formIsOpen.value = !formIsOpen.value;
};

const addItem = async () => {
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
    // id: String(Math.floor(Math.random() * 100)),
    name: formData.value.name,
    description: formData.value.description,
    priority: formData.value.priority,
    completed: false,
    status: 0,
  };

  columns.value[0].unshift(newTask);

  const res = await fetch("https://640dc3a6b07afc3b0db57282.mockapi.io/todos", {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  console.log(data);

  formData.value = {
    name: "",
    description: "",
    priority: {},
    completed: false,
  };

  formIsOpen.value = !formIsOpen.value;
};

// Отмечаем задачу

const updateTask = async (id) => {
  const updatedTask = {
    completed: true,
    status: 3,
  };

  await fetch(`https://640dc3a6b07afc3b0db57282.mockapi.io/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedTask),
    headers: {
      "Content-Type": "application/json",
    },
  });

  columns.value.map((column, index) => {
    column.map((item) => {
      if (item.id === id) {
        moveTask(item, id, index);
      }
    });
  });

  function moveTask(task, taskId, columnId) {
    if (!task.completed) {
      columns.value[columnId] = columns.value[columnId].filter((item) => {
        return item.id !== taskId;
      });
      columns.value[columns.value.length - 1].unshift(task);
    } else {
      task.status = columnId;
      columns.value[columns.value.length - 1] = columns.value[
        columns.value.length - 1
      ].filter((item) => item.id !== taskId);
      columns.value[task.status].unshift(task);
    }
  }
};

// Удаляем задачу

const removeTask = async (id) => {
  await fetch(`https://640dc3a6b07afc3b0db57282.mockapi.io/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // columns.value = columns.value.map((column) => {
  //   return column.filter((items) => items.id !== id);
  // });
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

// const catchColumnId()

// Поиск

// const handleValue = (value) => {
//   searchValue.value = value;
// };

// const filteredArr = computed(() => {
//   let filtered = [];
//   filtered = columns.value.map((column) =>
//     column.filter((items) => {
//       if (items.name.includes(searchValue.value)) {
//         return items;
//       }
//     })
//   );
//   return filtered;
// });

// Если закончили таску то — в колонку Done

const updateStatus = async (id, statusID) => {
  const updatedTask = {
    status: statusID,
  };
  await fetch(`https://640dc3a6b07afc3b0db57282.mockapi.io/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedTask),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

watch(columns.value, () => {
  for (let i = 0; i < columns.value.length - 1; i++) {
    columns.value[i].forEach((items) => {
      console.log(items.id);
      updateStatus(items.id, i);
      items.status = i;
      items.completed = false;
      // items.columnNumber = i;
    });
    columns.value[columns.value.length - 1].forEach((items) => {
      items.status = 3;
      items.completed = true;
    });
  }
});

// Поиск

const handle = (e) => {
  handleValue(e.target.value);
};

// Проверяем есть ли вообще задачи в колонке

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
    <div class="panel">
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

      <div class="container__loader" v-if="isLoading">
        <ProgressSpinner
          style="width: 50px; height: 50px"
          strokeWidtsh="4"
          animationDuration="1s"
          aria-label="Custom ProgressSpinner"
        />
      </div>

      <div v-else>
        <div v-if="isThereAnyTask" class="container">
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
                  :disabled="column.length < 2"
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
                  :completed="task.completed"
                  :priority="task.priority.name"
                  :status="task.status"
                  :updateTask="updateTask"
                  :removeTask="removeTask"
                />
              </template>
            </draggable>
          </div>
        </div>
        <div v-else class="p-6 border-round-2xl text-center bg-white">
          <div class="mb-5">
            <img :src="image" width="600" />
            <h1 class="text-center">You don't have any task</h1>
          </div>
          <Button label="Add task" icon="pi pi-plus" @click="handleModal" />
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

.container {
  position: relative;
  min-height: 500px;
  &__loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
  }
}
.ghost {
  background: rgb(234, 234, 234);
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

<!-- <app-task-item
                :id="task.id"
                :name="task.todo"
                :description="task.description"
                :priority="task.priority.name"
                :completed="task.completed"
                :updateTask="updateTask"
                :removeTask="removeTask"
                :editTask="handleEditForm"
                :checkedArr="checkedArr"
              >
              </app-task-item> -->
