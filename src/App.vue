<template>
  <div>
    <header>
      <h1>Vue Todo width Typescript</h1>
    </header>
    <main>
      <todo-input :item="todoText" @input="updateTodoText" @add="addTodoItem">
      </todo-input>
      <article>
        <ul>
          <todo-list-item
            v-for="(todoItem, idx) in todoItems"
            :key="idx"
            :todoItem="todoItem"
          >
          </todo-list-item>
        </ul>
      </article>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TodoInput from "./components/TodoInput.vue";
import TodoListItem from "./components/TodoListItem.vue";

// api 역할
const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  save(todoItems: any) {
    const parsed = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  fetch() {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    const data = JSON.parse(todoItems);
    return data;
  },
};

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      todoItems: [] as any,
    };
  },
  created() {
    this.fetchTodoItems();
  },
  methods: {
    updateTodoText(value: string) {
      this.todoText = value;
    },
    addTodoItem() {
      const value = this.todoText;
      this.todoItems.push(value);
      storage.save(this.todoItems);
      this.initTodoText();
    },
    initTodoText() {
      this.todoText = "";
    },
    fetchTodoItems() {
      this.todoItems = storage.fetch();
    },
  },
});
</script>

<style scoped></style>
