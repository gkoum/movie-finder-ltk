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
      imgList: [
        'http://via.placeholder.com/350x150',
        'http://via.placeholder.com/350x151',
        'http://via.placeholder.com/350x152'
      ],
      currentImg: 0,
      back: false,
      t: () => {}
    };
  },
  mounted() {
    // setInterval(() => {
    //     this.currentImg = this.currentImg + 1;
    // }, 3000);
    this.$store.dispatch("SET_MOVIE", this.movieSelected)
    this.waitToGetMovie()
  },
  methods: {
    getMovie () {
      console.log(this.movieSelected)
      this.$store.dispatch("GET_MOVIE", this.movieSelected.imdbID)
    },
    waitToGetMovie () {
      clearTimeout(this.t)
      this.t = setTimeout(() => {
        this.getMovie()
      }, 3000);
    },
    next() {
      this.back = false;
      this.currentImg = this.currentImg + 1;
      const currentMovieIndex = this.moviesList.findIndex(movie => movie.imdbID === this.movieSelected.imdbID);
      console.log(currentMovieIndex, this.moviesList)
      if (currentMovieIndex !== 9) {
        this.$store.dispatch("SET_MOVIE", this.moviesList[currentMovieIndex + 1])
        this.waitToGetMovie()
      } else {
        this.$store.dispatch("SET_PAGE", this.page + 1)
        this.$store.dispatch("GET_MOVIES", {title: this.searchString, page: this.page})
        .then(response => {
          console.log(response);
          clearTimeout(this.t)
          this.$store.dispatch("SET_MOVIE", response.data.Search[0])
          // this.waitToGetMovie()
        })
      }
    },
    prev() {
      this.back = true;
      this.currentImg = this.currentImg - 1;
      const currentMovieIndex = this.moviesList.findIndex(movie => movie.imdbID === this.movieSelected.imdbID);
      this.$store.dispatch("SET_MOVIE", this.moviesList[currentMovieIndex - 1])
      this.waitToGetMovie()
    }
  },
  computed: {
    allInfo () {
      return `Writer: ${this.movieSelected.Writer}<hr/>
        Director: ${this.movieSelected.Director}<hr/>
        Actors: ${this.movieSelected.Actors}`
    },
    ...mapState(["searchString", "loadingMovies", "loadingMovie", "moviesList", "movieSelected", "page"])
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
