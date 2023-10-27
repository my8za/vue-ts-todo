import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

/**
 * 할 일 관리, 투두리스트 (CRUD)
 * - 투두리스트 조회
 * - 할 일 추가
 * - 할 일 삭제
 * - 할 일 수정
 *
 */
