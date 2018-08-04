<template>
  <section class="home">
    <div class="columns">
      <div class="column" v-for="provider in this.providers" :key="provider.title">
        <component :is="provider.component"></component>
      </div>
    </div>
  </section>
</template>

<script>
import HackerNews from '@/components/providers/HackerNews.vue';
import ProductHunt from '@/components/providers/ProductHunt.vue';
import Github from '@/components/providers/Github.vue';
import Reddit from '@/components/providers/Reddit.vue';

const providers = [
  {
    name: 'Reddit',
    component: 'Reddit',
    selected: true,
  },
  {
    name: 'Product Hunt',
    component: 'ProductHunt',
    selected: true,
  },
  {
    name: 'Hacker News',
    component: 'HackerNews',
    selected: true,
  },
  {
    name: 'Github',
    component: 'Github',
    selected: true,
  },
];

export default {
  name: 'Home',
  props: ['query'],
  components: {
    HackerNews,
    ProductHunt,
    Github,
    Reddit,
  },
  data() {
    return {
      providers,
    };
  },
};
</script>
