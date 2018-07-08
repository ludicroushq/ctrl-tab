import { shallowMount } from '@vue/test-utils';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('is defined', () => {
    const wrapper = shallowMount(Home);
    expect(wrapper).toBeDefined();
  });
});
