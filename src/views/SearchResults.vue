<template>
  <div>
    <Loader v-if="loadingMovies"></Loader>
    <MovieSlider v-else></MovieSlider>
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
