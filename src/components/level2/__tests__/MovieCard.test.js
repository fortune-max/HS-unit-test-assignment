import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import MovieCard from '../MovieCard.vue';
import MoonRating from '../Rating.vue';

describe('MovieCard.vue', () => {
  const mockMovie = {
    id: "thebiglebowski1998",
    title: "The Big Lebowski",
    score: "83",
    picture: "testImageUrl",
  };

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
        movie: mockMovie,
        favoriteMovie: mockMovie.id,
      },
      global: {
        stubs: {
          MoonRating: {
            template: '<div>🌕🌕🌕🌕</div>'
          },
        }
      }
    });

    const img = wrapper.find(".movie-poster");
    expect(img.attributes('src')).toBe('testImageUrl');
    const movieTitle = wrapper.find(".movie-title");
    expect(movieTitle.text()).toContain(mockMovie.title);
    expect(wrapper.text()).toContain(`Rating: ${mockMovie.score}%`);
    const ratingComponent = wrapper.findComponent(MoonRating);
    expect(ratingComponent.text()).toBe("🌕🌕🌕🌕");
    const button = wrapper.find('button');
    expect("disabled" in button.attributes()).toBeTruthy();
  });

  // TODO: rest computed from prop favoriteMovie is rendering the 😍 emoji when the prop movie's id is matching

  it('favorite movie has 😍 emoji next to Title', () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie,
        favoriteMovie: mockMovie.id,
      },
    });

    const movieTitle = wrapper.find(".movie-title");
    expect(movieTitle.text()).toContain("😍");
  });

  // TODO: test event favorite-selected is being emitted on button click

  it('button emits favorite-selected event on click', async () => {
    const wrapper = mount(MovieCard, {
      props: {
        movie: mockMovie,
      },
    });

    const button = wrapper.find('button');
    await button.trigger('click');
    expect(wrapper.emitted('favorite-selected')).toBeTruthy();
    expect(wrapper.emitted('favorite-selected')[0][0]).toBe(mockMovie.id);
  });
});
