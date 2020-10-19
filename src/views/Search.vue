<template>
  <div>
    <h2>Search For Movies</h2>
    <div class="container">
      <img alt="Vue logo" src="../assets/logo.png" />
      <BaseButton
        type="button"
        @click="search"
        class="button--primary button--inside"
      >
        <span>Find</span>
      </BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
    };
  },
  methods: {
    search() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/design/index.scss';

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
</style>
