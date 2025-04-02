import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Vue from "vue";
import App from "@/App";

new Vue({
  el: "#app",
  template: "<App/>",
  components: { App }
});
