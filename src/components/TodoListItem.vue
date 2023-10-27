<template>
  <li>
    <input type="checkbox" @click="toggleItem" :checked="todoItem.done" />
    <span class="list-item" :class="listItemClass"
      >{{ todoItem.content }}
    </span>
    <button @click="removeItem">X</button>
  </li>
</template>

<script lang="ts">
import Vue from "vue";
import { Todo } from "@/App.vue";
import { PropType } from "vue/types/v3-component-props";

export default Vue.extend({
  props: {
    todoItem: Object as PropType<Todo>,
    index: Number,
  },
  // Vue.js는 생성하는 시점에 없었던 data에 반응하지 않는다.
  // props로 전달받은 todoItem의 값은 변화에 따라 화면이 업데이트 되지 않음
  // => computed로 조건 처리~! 리액트의 useMemo와 유사함
  computed: {
    // computed 속성 함수를 정의할때는 반드시 반환타입이 필요함, 필수!
    listItemClass(): string | null {
      return this.todoItem.done ? "complete" : null;
    },
  },
  methods: {
    toggleItem() {
      this.$emit("toggle", this.todoItem, this.index);
    },
    removeItem() {
      this.$emit("remove", this.index);
    },
  },
});
</script>

<style scoped>
.list-item {
  cursor: pointer;
}
.complete {
  text-decoration: line-through;
}
</style>
