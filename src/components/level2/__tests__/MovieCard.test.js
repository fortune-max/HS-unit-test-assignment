import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MovieCard from '../MovieCard.vue';

describe('MovieCard.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: {},
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  // TODO: test prop movie's values are rendered correctly

  it('movie passed through props is rendered correctly', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: {
          id: "metropolis1927",
          title: "Metropolis",
          score: "83",
          picture: "testImageUrl",
        },
        favoriteMovie: "metropolis1927",
      },
    });

    const img = wrapper.find(".movie-poster");
    expect(img.attributes('src')).toBe('testImageUrl');
    const movieTitle = wrapper.find(".movie-title");
    expect(movieTitle.text()).toContain("Metropolis");
    expect(wrapper.text()).toContain("Rating: 83%");
    expect(wrapper.text()).toContain("🌕🌕🌕🌕");
    const button = wrapper.find('button');
    expect("disabled" in button.attributes()).toBeTruthy();
  });

  // TODO: rest computed from prop favoriteMovie is rendering the 😍 emoji when the prop movie's id is matching

  it('favorite movie has 😍 emoji next to Title', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: {
          id: "metropolis1927",
          title: "Metropolis",
          score: "83",
          picture: "testImageUrl",
        },
        favoriteMovie: "metropolis1927",
      },
    });

    const movieTitle = wrapper.find(".movie-title");
    expect(movieTitle.text()).toContain("😍");
  });

  // TODO: test event favorite-selected is being emitted on button click

  it('button emits favorite-selected event on click', async () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: {
          id: "metropolis1927",
          title: "Metropolis",
          score: "83",
          picture: "testImageUrl",
        },
      },
    });

    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('favorite-selected')).toBeTruthy();
  });
});
