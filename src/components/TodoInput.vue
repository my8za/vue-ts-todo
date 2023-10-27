<template>
  <form @submit.prevent="addTodo">
    <label for="todo-input">Todo : </label>
    <input id="todo-input" type="text" :value="item" @input="handleInput" />
    <button type="button">추가</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  props: {
    item: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleInput(e: InputEvent) {
      const eventTarget = e.target as HTMLInputElement;
      this.$emit("input", eventTarget.value);
    },
    addTodo() {
      this.$emit("add");
    },
  },
});
</script>

<style scoped></style>
