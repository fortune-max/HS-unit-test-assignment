import { expect, it, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Ratings from '../Rating.vue';
import * as moonScore from '../utils/moonScore';

describe('Ratings.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(Ratings);
    expect(wrapper.exists()).toBe(true);
  });

  // TODO: how to test for prop score here?
  it('Ensure Rating I/O is same as previously tested getMoonScore I/O', async() => {
    const getMoonScore = vi.spyOn(moonScore, 'getMoonScore').mockReturnValue("testVal");

    const wrapper = mount(Ratings, {
      props: {
        score: 42,
      }
    });

    expect(getMoonScore).toBeCalledWith(42);
    expect(wrapper.text()).toBe("testVal");
  });
});
