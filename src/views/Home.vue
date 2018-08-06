<template>
  <section class="home">
    <div :class="{ modal: true, 'is-active': settingsModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Settings</p>
          <button class="delete" aria-label="close" @click="closeSettingsModal"></button>
        </header>
        <section class="modal-card-body">
          Settings coming soon!
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="closeSettingsModal">Close</button>
        </footer>
      </div>
    </div>
    <fab
      icon-size="small"
      bg-color="#363636"
      z-index="30"
      :actions="fabActions"
      @settings="openSettingsModal"
    ></fab>
    <div class="columns">
      <div class="column" v-for="provider in this.providers" :key="provider.title">
        <component :is="provider.component"></component>
      </div>
    </div>
  </section>
</template>

<script>
import fab from 'vue-fab';

import HackerNews from '@/components/providers/HackerNews.vue';
import ProductHunt from '@/components/providers/ProductHunt.vue';
import Github from '@/components/providers/Github.vue';
import Reddit from '@/components/providers/Reddit.vue';
import Todoist from '@/components/providers/Todoist.vue';

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
  {
    name: 'Todoist',
    component: 'Todoist',
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
    Todoist,
    fab,
  },

  methods: {
    openSettingsModal() {
      this.settingsModal = true;
    },
    closeSettingsModal() {
      this.settingsModal = false;
    },
  },

  data() {
    return {
      providers,
      settingsModal: false,
      fabActions: [
        {
          name: 'settings',
          icon: 'settings',
          color: '#3f51b5',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.fab-wrapper {
  right: 1vw !important;
  bottom: 1vh !important;
}
</style>
