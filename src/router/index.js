import Vue from "vue";
import VueRouter from "vue-router";
import Search from "../views/Search.vue";
import SearchResults from "../views/SearchResults.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Search",
    component: Search
  },
  {
    path: "/results",
    name: "results",
    component: SearchResults
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
