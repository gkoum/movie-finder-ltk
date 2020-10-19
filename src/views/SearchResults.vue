<template>
  <div>
    <Loader v-show="loadingMovies"></Loader>
    <MovieSlider v-show="!loadingMovies"></MovieSlider>
  </div>
</template>

<script>
import MovieSlider from "@/components/MovieSlider.vue";
import { mapState } from "vuex";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    MovieSlider,
    Loader
  },
  computed: {
    ...mapState(["loadingMovies"])
  }
};
</script>
