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
            :index="idx"
            :todoItem="todoItem"
            @toggle="toggleTodoStatus"
            @remove="removeTodoItem"
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
// 로컬 스토리지 저장 형태 => STORAGE_KEY: [{}, {}]
const STORAGE_KEY = "vue-todo-ts-v1";
const storage = {
  // 로컬스토리지에 데이터 저장
  save(todoItems: Todo[]) {
    const parsed = JSON.stringify(todoItems);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
  // 로컬스토리지에 저장된 데이터 가져오기
  fetch(): Todo[] {
    const todoItems = localStorage.getItem(STORAGE_KEY) || "[]";
    const data = JSON.parse(todoItems);
    return data;
  },
};

// 투두 아이템 구조화
export interface Todo {
  content: string;
  done: boolean;
}

export default Vue.extend({
  components: { TodoInput, TodoListItem },
  data() {
    return {
      todoText: "",
      todoItems: [] as Todo[],
    };
  },
  created() {
    this.fetchTodoItems();
  },
  methods: {
    // input창 입력변화 감지
    updateTodoText(value: string) {
      this.todoText = value;
    },
    // 투두 아이템 추가
    addTodoItem() {
      const value = this.todoText;
      const todo: Todo = {
        content: value,
        done: false,
      };
      this.todoItems.push(todo);
      storage.save(this.todoItems);
      this.initTodoText();
    },
    // 입력창 초기화
    initTodoText() {
      this.todoText = "";
    },
    // fetch api 호출
    fetchTodoItems() {
      this.todoItems = storage.fetch().sort((a, b) => {
        if (a.content > b.content) {
          return 1;
        }
        if (a.content < b.content) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    },
    // 투두 완료 상태 체인지(토글)
    toggleTodoStatus(todoItem: Todo, index: number) {
      this.todoItems.splice(index, 1, {
        ...todoItem,
        done: !todoItem.done,
      });
      storage.save(this.todoItems);
    },
    // 투두아이템 삭제
    removeTodoItem(index: number) {
      console.log("remove ", index);
      this.todoItems.splice(index, 1);
      storage.save(this.todoItems);
    },
  },
});
</script>

<style scoped></style>
