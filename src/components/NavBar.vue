<template>
  <ul>
    <li @click="goToSearch">Search</li>
    <li @click="goToResults">Results</li>
    <!-- <li style="float:right"><a class="active" href="#about">About</a></li> -->
  </ul>
</template>

<script>
import router from "../router/index";

export default {
  methods: {
    goToSearch () {
      router.replace('/');
    },
    goToResults () {
      router.replace('/results');
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  border-radius: 5px;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #b47e20;
}

li {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li:hover:not(.active) {
  background-color: #c68a50;
}

.active {
  background-color: #c68a50;
}
</style>
