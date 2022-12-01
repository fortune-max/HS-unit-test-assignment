import { flushPromises, mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import FetchSuspense from './FetchSuspense.vue';
import ParentTestStub from './ParentTestStub.vue';
import { mockGet } from 'vi-fetch';
import 'vi-fetch/setup';
// TODO: complete the test suite for this component!

describe('FetchSuspense.vue', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders correctly', () => {
    const wrapper = mount(FetchSuspense);
    expect(wrapper.exists()).toBe(true);
  });

  it('calls fetch API', () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    const wrapper = mount(FetchSuspense);
    expect(fetchSpy).toBeCalledTimes(1);
    expect(fetchSpy).toBeCalledWith('https://yesno.wtf/api');
  });

  it('throws error on fetch not ok', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    fetchSpy.mockImplementation(()=>{
      return Promise.resolve({ok: false});
    });

    const wrapper = mount(ParentTestStub);
    expect(wrapper.exists()).toBe(true);
    expect(fetchSpy).toBeCalledTimes(1);
    expect(fetchSpy).toBeCalledWith('https://yesno.wtf/api');
    await flushPromises();
    expect(wrapper.emitted('error-with-child')).toBeTruthy();
  });

  it('throws error on fetch error', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    fetchSpy.mockImplementation(()=>{
      return Promise.reject();
    });

    const wrapper = mount(ParentTestStub);
    expect(wrapper.exists()).toBe(true);
    expect(fetchSpy).toBeCalledTimes(1);
    expect(fetchSpy).toBeCalledWith('https://yesno.wtf/api');
    await flushPromises();
    expect(wrapper.emitted('error-with-child')).toBeTruthy();
  });

  it('shows image once fetch is completed', async () => {
    mockGet('https://yesno.wtf/api').willResolve({
      ok: true,
      image: "imageUrl",
    });

    const wrapper = mount(ParentTestStub);
    expect(wrapper.findAll('img').length).toBe(0);
    await flushPromises();
    expect(wrapper.findAll('img').length).toBe(1);
    expect(wrapper.find('img').element.alt).toBe("image from api");
    expect(wrapper.find('img').element.src).toContain('imageUrl');
  });
});
