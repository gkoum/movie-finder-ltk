<template>
  <div :class="$style.chip" v-on="$listeners">
    <img
      :src="require(`../assets/${imageSrc}`)"
      :alt="alt"
      width="96"
      height="96"
    />
    <span v-html="text"></span>
  </div>
</template>

<script>
export default {
  props: {
    imageSrc: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="scss" module>
.chip {
  width: 300px;
  padding: 0 25px;
  margin: 10px;
  font-size: 16px;
  line-height: 50px;
  border-radius: 25px;
  background-color: #fcd99b;
}

.chip img {
  float: left;
  margin: 0 10px 0 -25px;
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
</style>
