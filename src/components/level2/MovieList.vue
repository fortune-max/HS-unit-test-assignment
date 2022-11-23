<script setup>
import MovieCard from './MovieCard.vue';
import { ref } from 'vue';
import dataService from './utils/dataService';

const movies = dataService.getMovies();

function setFavoriteMovie(newFavoriteMovieId) {
  favoriteMovie.value = newFavoriteMovieId;
}
const favoriteMovie = ref('');
</script>
<template>
  <div class="movie-list">
    <MovieCard
      v-for="movie in movies"
      :movie="movie"
      :key="movie.id"
      :favorite-movie="favoriteMovie"
      @favorite-selected="setFavoriteMovie"
    />
  </div>
  <div class="controls">
    Favorite Selector
    <select v-model="favoriteMovie">
      <option v-for="movie in movies" :key="movie.id" :value="movie.id">
        {{ movie.title }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.movie-list {
  margin: 20px;
  display: flex;
  padding: 15px;
  border-bottom: 1px solid white;
}
</style>
