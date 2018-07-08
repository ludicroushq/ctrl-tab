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
import Github from '@/components/providers/Github.vue';
import Reddit from '@/components/providers/Reddit.vue';

const providers = [
  {
    name: 'Reddit',
    component: 'Reddit',
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
  components: {
    HackerNews,
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

<style lang="scss">
.home {
  padding: 1em;
}

.message-body {
  padding: 0em;
  height: 88vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.item {
  margin: 0.5em;
}

hr {
  margin: 0.25em;
}
</style>
