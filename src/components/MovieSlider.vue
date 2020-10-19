<!-- Simple Slider based only on native Vue transition  -->
<template>
<div>
  <div id="slider">
    <Chip v-if="movieSelected.Plot" imageSrc="year.png" :text="movieSelected.Year" alt="Year" class="smallHeight smallWidth"></Chip>
    <Chip imageSrc="title.jpg" :text="movieSelected.Title" alt="Title"></Chip>
    <Chip v-if="movieSelected.Writer" imageSrc="type.png" :text="movieSelected.Type" alt="Type" class="smallHeight smallWidth"></Chip>
    <div class="break"></div>
    <span id="transition">
      <Loader v-if="loadingMovie"> </Loader>
      <Chip v-else-if="!movieSelected.Plot" imageSrc="year.png" :text="movieSelected.Year" alt="Year" class="smallHeight smallWidth"></Chip>
      <Chip  v-else imageSrc="plot.png" :text="movieSelected.Plot" alt="Plot" class="largeHeight largeWidth"></Chip>
      <!-- <transition-group
        tag="div"
        class="img-slider"
        :name="back ? 'slideback' : 'slide'"
      >
        <div v-for="movie in moviesList" :key="movie.imdbID">
          <img :src="movieSelected.Poster" />
        </div>
      </transition-group> -->
      <transition-group tag="div" class="img-slider" name="slide">
        <div v-for="number in [currentImg]" :key="number" >
          <img :src="moviesList[Math.abs(currentImg) % moviesList.length].Poster"/>
        </div>
      </transition-group>
      <Loader v-if="loadingMovie"> </Loader>
      <Chip v-else-if="!movieSelected.Writer" imageSrc="type.png" :text="movieSelected.Type" alt="Type" class="smallHeight smallWidth"></Chip>
      <Chip  v-else imageSrc="details.png" :text="allInfo" alt="Author" class="largeHeight largeWidth"></Chip>
    </span>
  </div>
  <BaseButton type="button" @click="prev" class="prevButton">
    <span>&#10094;</span>
  </BaseButton>
  <BaseButton type="button" @click="next" class="nextButton">
    <span>&#10095;</span>
  </BaseButton>
</div>
</template>

<script>
import { mapState } from "vuex";
import BaseButton from "@/components/_base-button.vue";
import Chip from "@/components/Chip.vue";
import Loader from "@/components/Loader.vue";

export default {
  components: {
    BaseButton,
    Chip,
    Loader
  },
  data() {
    return {
      currentImg: 0,
      back: false,
      t: () => {}
    };
  },
  methods: {
    next() {
      this.back = false;
      this.currentImg = this.currentImg + 1;
    },
    prev() {
      this.back = true;
      this.currentImg = this.currentImg - 1;
    }
  },
  computed: {
    ...mapState(["loadingMovie", "moviesList", "movieSelected"])
  }
};
</script>

<style lang="scss" scoped>


.break {
  flex-basis: 100%;
  height: 0;
}

.smallWidth {
  width: 150px;
}
.smallHeight {
  height: 50px;
}

.largeHeight {
  height: 420px;
}

.largeWidth {
  width: 300px;
}

button {
  border: 2px solid #bbb;
  width: 90px;

  &.nextButton {
    border-radius: 0px 25px 25px 0px;
  }

  &.prevButton {
    border-radius: 25px 0px 0px 25px;
  }
}

#transition {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

#slider {
  overflow: hidden;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.slideback-leave-active,
.slideback-enter-active {
  transition: 1s;
}

.slideback-enter {
  transform: translate(-100%, 0);
}

.slideback-leave-to {
  transform: translate(100%, 0);
}

.slide-leave-active,
.slide-enter-active {
  transition: 2s;
}
.slide-enter {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}

.img-slider {
  overflow: hidden;
  position: relative;
  height: 500px;
  width: 400px;
}

.img-slider img {
  position: absolute;
  top: 0;
  left: 50px;
  bottom: 0;
  right: 0;
}
</style>
