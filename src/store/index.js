import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
// import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingMovies: false,
    loadingMovie: false,
    moviesList: [],
    searchString: "",
    movieSelected: {},
    page: 1
  },
  mutations: {
    SET_PAGE: (state, { page }) => {
      state.page = page;
    },
    SET_SEARCH_STRING: (state, { searchString }) => {
      state.searchString = searchString;
    },
    SET_MOVIE: (state, { movieSelected }) => {
      state.movieSelected = movieSelected;
    },
    SET_MOVIES: (state, { movies }) => {
      state.moviesList = movies;
    }
  },
  actions: {
    SET_PAGE: function({ commit }, page) {
      commit("SET_PAGE", { page: page });
    },
    SET_SEARCH_STRING: function({ commit }, searchString) {
      commit("SET_SEARCH_STRING", { searchString: searchString });
    },
    SET_MOVIE: function({ commit }, movie) {
      commit("SET_MOVIE", { movieSelected: movie });
    },
    GET_MOVIE: function({ state, commit }, imdbID) {
      state.loadingMovie = true;
      axios
        .get(`http://www.omdbapi.com/?i=${imdbID}&apikey=6f37363d`)
        .then(response => {
          if (response.data.Response === "False") {
            alert(response.data.Error);
          } else {
            commit("SET_MOVIE", { movieSelected: response.data });
          }
          state.loadingMovie = false;
          return response;
        })
        .catch(err => {
          state.loadingMovie = false;
          alert(err);
          return err;
        });
    },
    GET_MOVIES: function({ state, commit }, { title, page }) {
      if (title !== "") {
        state.loadingMovies = true;
        const getMovies = axios
          .get(
            `http://www.omdbapi.com/?s=${title}&page=${page}&apikey=6f37363d`
          )
          .then(response => {
            if (response.data.Response === "False") {
              alert(response.data.Error);
            } else {
              commit("SET_MOVIES", { movies: response.data.Search });
            }
            state.loadingMovies = false;
            return response;
          })
          .catch(err => {
            state.loadingMovies = false;
            alert(err);
            return err;
          });
        return getMovies;
      } else {
        return null;
      }
    }
  },
  modules: {}
});
