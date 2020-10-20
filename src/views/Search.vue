<template>
  <div>
    <img alt="imdb logo" src="../assets/logo.png" />
    <h2>Search For Movies</h2>
    <div class="container">
      <form class="form">
        <input
          class="form__field"
          placeholder="Movie Title"
          @keydown.enter.exact.prevent
          @keyup.enter.exact="search"
          v-model="title"
        />
        <BaseButton
          type="button"
          @click="search"
          class="button--primary button--inside"
        >
          <span>Find</span>
        </BaseButton>
      </form>
      <p>created by Giannis Koumoutsos</p>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/_base-button.vue";
import router from "../router/index";
import { mapState } from "vuex";

export default {
  name: "Search",
  components: {
    BaseButton
  },
  mounted() {
    this.title = this.searchString;
  },
  data() {
    return {
      title: ""
    };
  },

  methods: {
    search() {
      this.$store.dispatch("SET_SEARCH_STRING", this.title);
      if (this.searchString !== "") {
        this.$store
          .dispatch("GET_MOVIES", { title: this.title, page: this.page })
          .then(response => {
            if (!response.data.Error) {
              this.$store.dispatch("SET_MOVIE", response.data.Search[0]);
              router.replace("/results");
            }
          });
      }
    }
  },
  computed: {
    ...mapState(["searchString", "page"])
  }
};
</script>

<style lang="scss" scoped>
@import "src/design/index.scss";

//** root
:root {
  background: $background;
  color: $color-text;
  font: 1rem "PT Sans", sans-serif;
}

html,
body,
.container {
  height: 100%;
}

//** helper
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

//** button
.button {
  &--primary {
    height: 60px;
  }
  &--inside {
    margin-left: -16px;
  }
}

//** form
.form {
  width: 500px;
  &__field {
    width: 70%;
    background: #fff;
    color: $input-text-color;
    font: inherit;
    box-shadow: 0 0 10px 2px #ffa000;
    border: 0;
    outline: 0;
    padding: 22px 18px;
  }
}
</style>
