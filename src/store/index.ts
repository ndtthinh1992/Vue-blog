import Vue from "vue";
import Vuex from "vuex";
import module_blog from "./blog";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    blog: module_blog,
  },
});
