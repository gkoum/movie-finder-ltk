import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingMovies: false,
    moviesList: [],
    searchString: ""
  },
  mutations: {
    SET_SEARCH_STRING: (state, { searchString }) => {
      console.log(searchString);
      state.searchString = searchString;
    },
    SET_MOVIES: (state, { movies }) => {
      console.log(movies);
      state.moviesList = movies;
      state.movieSelected = movies[0];
    }
  },
  actions: {
    SET_SEARCH_STRING: function ({ commit }, searchString) {
      commit("SET_SEARCH_STRING", { searchString: searchString });
    },
    GET_MOVIES: function ({ state, commit }, { title, page }) {
      if (title !== "") {
        state.loadingMovies = true;
        const getMovies = axios
          .get(`http://www.omdbapi.com/?s=${title}&page=${page}&apikey=6f37363d`)
          .then(response => {
            console.log(response);
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
