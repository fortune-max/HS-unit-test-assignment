import { expect, it, describe, vi } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import MovieList from '../MovieList.vue';
import MovieCard from '../MovieCard.vue';
import dataService from '../utils/dataService';

describe('MovieList.vue', () => {
  const mockedMovieList = [{
    id: "tpb1987",
    title: "The Princess Bride",
    score: "97",
    picture: "testImageUrl"
  }, {
    id: "bttf1985",
    title: "Back To The Future",
    score: "97",
    picture: "testImageUrl"
  }];

  it('renders correctly', () => {
    const wrapper = shallowMount(MovieList);

    expect(wrapper.exists()).toBe(true);
  });

  // TODO: Why is this a bad test? Reason your answer
  // [It is not a self-contained test, makes assumptions, has external dependencies whose behaviour isn't guaranteed]
  // TODO: Rework the test so it follows best practices
  it('should render movie list', async () => {
    const mockedMovieList = [{}, {}];
    const getMovies = vi.spyOn(dataService, 'getMovies').mockReturnValue(mockedMovieList);
    const wrapper = shallowMount(MovieList);
    const movieCards = wrapper.findAllComponents(MovieCard);

    expect(getMovies).toBeCalledTimes(1);
    expect(movieCards.length).toBe(mockedMovieList.length);
  });

  // TODO: write this test!
  it('should have no favorite movie by default', async () => {
    vi.spyOn(dataService, 'getMovies').mockReturnValue(mockedMovieList);
    const wrapper = shallowMount(MovieList);
    const favoriteSelectorMovie = wrapper.find('.controls option:checked');
    expect(favoriteSelectorMovie.exists()).toBeFalsy();
  });

  // TODO: TDD time!
  // Make this test pass by adding the missing functionality in the MovieList.vue component
  // TODO: After you made the test pass, rework the test so it follows best practices
  it('should update favorite movie on favorite-selected event received', async () => {
    vi.spyOn(dataService, 'getMovies').mockReturnValue(mockedMovieList);
    const wrapper = mount(MovieList);
    const movieCard = wrapper.findAllComponents(MovieCard)[0];
    await movieCard.vm.$emit('favorite-selected', mockedMovieList[0].id);
    expect(movieCard.emitted('favorite-selected')).toBeTruthy();
    expect(movieCard.emitted('favorite-selected')[0][0]).toBe(mockedMovieList[0].id);
    await wrapper.vm.$nextTick();
    const select = wrapper.find('option:checked');
    expect(select.exists()).toBeTruthy();
    expect(select.element.value).toBe(mockedMovieList[0].id)
  });
});
